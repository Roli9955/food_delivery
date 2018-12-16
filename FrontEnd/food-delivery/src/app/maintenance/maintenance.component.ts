import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../classes/category';
import { Product } from '../classes/product';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

export interface CategoryDialog{
  category: Category;
}

export interface ProductDialog{
  product: Product;
  categories: Category[]
}

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  private categories: Category[] = [];
  private products: Product[] =  [];
  private category: Category;
  private product: Product;

  private categoryDisplay = ['id', 'name', 'numberOfProducts', 'edit'];
  private productDisplay = ['id', 'name', 'category', 'vegetarian', 'hot', 'price', 'outOfOrder', 'edit'];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private dialogCategory: MatDialog,
    private dialogProduct: MatDialog
  ) { }

  async ngOnInit() {
    this.categories = await this.categoryService.getAllCategory();
    this.products = await this.productService.getProducts().then((res: Product[]) => {

      for(let prod of res){
        for(let cat of this.categories){
          for(let catProd of cat.products){
            if(prod.id === catProd.id){
              prod.category = cat;
              break;
            }
          }
        }
      }

      return res;
    });
  }

  async addOrEditCategory(id: number = -1){

    if(id === -1){
      this.category = new Category;
      this.category.id = -1;
    } else {
      this.category = await this.categoryService.getCategoryById(id);
    }

    const dialogRef = this.dialogCategory.open(MaintenanceComponentCategoryDialog,{
      width: '40%',
      data: {category: this.category}
    });

    dialogRef.afterClosed().subscribe(async() => {
      this.categories = await this.categoryService.getAllCategory();
      this.products = await this.productService.getProducts().then((res: Product[]) => {

        for(let prod of res){
          for(let cat of this.categories){
            for(let catProd of cat.products){
              if(prod.id === catProd.id){
                prod.category = cat;
                break;
              }
            }
          }
        }
  
        return res;
      });
    });

  }

  async addOrEditProduct(id: number = -1, category: Category = null){
    if(id === -1){
      this.product = new Product;
      this.product.id = -1;
      this.product.category = new Category;
      this.product.category.id = -1;
    } else {
      this.product = await this.productService.getProductById(id);
      this.product.category = category;
    }

    const dialogRef = this.dialogProduct.open(MaintenanceComponentProductDialog,{
      width: '40%',
      data: {
        product: this.product, 
        categories: await this.categoryService.getAllCategory()
      }

    });

    dialogRef.afterClosed().subscribe(async() => {
      this.categories = await this.categoryService.getAllCategory();
      this.products = await this.productService.getProducts().then((res: Product[]) => {

        for(let prod of res){
          for(let cat of this.categories){
            for(let catProd of cat.products){
              if(prod.id === catProd.id){
                prod.category = cat;
                break;
              }
            }
          }
        }
  
        return res;
      });
    });

  }
}

@Component({
  selector: 'app-maintenance-add-category',
  templateUrl: './maintenance-add-category.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponentCategoryDialog{

    private categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });

  constructor(
    public dialogRef: MatDialogRef<MaintenanceComponentCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryDialog,
    private categiryService: CategoryService,
    private snackBar: MatSnackBar,
    ) {
      this.categoryForm.controls['name'].setValue(this.data.category.name);
    }

    async addCategory(){

      const name: string = this.categoryForm.get('name').value;

      if(!name ){
        return;
      }

      if(this.data.category.id === -1){
        var newCategory: Category = new Category;
        newCategory.name = name;

        await this.categiryService.addCategory(newCategory);

        this.snackBar.open('A kategóriát sikeresen hozzáadtuk!', '', {
          duration: 1500
        });
      } else {
        this.data.category.name = name;
        await this.categiryService.putCategory(this.data.category.id, this.data.category);

        this.snackBar.open('A kategóriát sikeresen módosítottuk!', '', {
          duration: 1500
        });
      }

      this.dialogRef.close();
      
    }
}

@Component({
  selector: 'app-maintenance-add-product',
  templateUrl: './maintenance-add-product.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponentProductDialog{

  private productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    outOfOrder: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    vegetarian: new FormControl(''),
    hot: new FormControl('')
  });

  private categories: Category[];

  constructor(
    public dialogRef: MatDialogRef<MaintenanceComponentProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialog,
    private categoryService: CategoryService,
    private productService: ProductService,
    private snackBar: MatSnackBar,
  ){
    this.categories = this.data.categories;
    this.getCategories();
  }

  selected(id: number): string{
    if(id === this.data.product.category.id){
      return 'selected';
    }
    return '';
  }

  async getCategories(){
    this.categories = await this.categoryService.getAllCategory().then((res) => {
      this.productForm.controls['name'].setValue(this.data.product.name);
      this.productForm.controls['price'].setValue(this.data.product.price);
      this.productForm.controls['outOfOrder'].setValue(this.data.product.outOfOrder);
      this.productForm.controls['description'].setValue(this.data.product.description);
      this.productForm.controls['category'].setValue(this.data.product.category.id);
      this.productForm.controls['vegetarian'].setValue(this.data.product.vegetarian);
      this.productForm.controls['hot'].setValue(this.data.product.hot);
      return res;
    });
  }

  async saveData(){

    const name: string = this.productForm.get('name').value;
    const price: number = parseInt(this.productForm.get('price').value);
    const outOfOrder: boolean = this.productForm.get('outOfOrder').value as boolean;
    const category: number = parseInt(this.productForm.get('category').value);
    const description: string = this.productForm.get('description').value;
    const vegetarian: boolean = this.productForm.get('vegetarian').value;
    const hot: boolean = this.productForm.get('hot').value;

    if(!name || !price || !category || !description){
      return;
    }

    var product: Product = new Product();
    product.name = name;
    product.price = price;
    product.outOfOrder = outOfOrder;
    product.description = description;
    product.vegetarian = vegetarian;
    product.hot = hot;

    if(this.data.product.id === -1){
      var newProduct = await this.productService.postProduct(product);
      await this.categoryService.addProductToCategory(category, newProduct);
      this.snackBar.open('A terméket sikeresen hozzáadtuk!', '', {
        duration: 1500
      });
    } else {
      var newProduct = await this.productService.putProduct(product);
      await this.categoryService.addProductToCategory(category, newProduct);
      this.snackBar.open('A terméket sikeresen módosítottuk!', '', {
        duration: 1500
      });
    }

    this.dialogRef.close();

  }

}