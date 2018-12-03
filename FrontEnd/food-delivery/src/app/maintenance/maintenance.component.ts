import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../classes/category';
import { Product } from '../classes/product';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  private categories: Category[] = [];
  private products: Product[] =  [];
  private newCategory: Category = null;

  private categoryDisplay = ['id', 'name', 'numberOfProducts', 'edit'];
  private productDisplay = ['id', 'name', 'category', 'price', 'outOfOrder', 'edit'];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private dialog: MatDialog
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

  addNewCategory(){
      
      const dialogRef = this.dialog.open(MaintenanceComponentDialog,{
        width: '40%'
      });

      dialogRef.afterClosed().subscribe(async() => {
        this.categories = await this.categoryService.getAllCategory();
      });

  }

}

@Component({
  selector: 'app-maintenance-add-category',
  templateUrl: './maintenance-add-category.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponentDialog{

  constructor(
    public dialogRef: MatDialogRef<MaintenanceComponentDialog>,
    private categiryService: CategoryService,
    private snackBar: MatSnackBar
    ) {}

    private categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    

    async addCategory(){

      const name: string = this.categoryForm.get('name').value;

      if(!name ){
        return;
      }

      var newCategory: Category = new Category;
      newCategory.name = name;

      await this.categiryService.addCategory(newCategory);

      this.dialogRef.close();

      this.snackBar.open('A kategóriát sikeresen hozzáadtuk!', '', {
        duration: 1500
      });
    }
}
