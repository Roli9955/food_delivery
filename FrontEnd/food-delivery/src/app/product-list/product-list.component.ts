import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { fbind } from 'q';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material';
import { Category } from '../classes/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private _products : Product[];
  private categories: Category[];
  private selected: number = 0;

  private categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this._products = await this._productService.getProducts();
    this.categories = await this.categoryService.getAllCategory();
  }

  async filter(event){
    if(event.value === "0"){
      this._products = await this._productService.getProducts();
    } else {
      this._products = await this.categoryService.getCategoryById(event.value).then((res: Category) => {
        return res.products;
      });
    }
  }
  
  async addToCart(id: number){
    if(await this._cartService.addProductTocart(id)){
      this.snackBar.open('A terméket hozzáadtuk a kosárhoz!', '', {
        duration: 1500
      });
    } else {
      this.snackBar.open('A terméket nem sikerült hozzáadni a kosárhoz, mert elérte a rendelni kívánt termékek össze a maximumot. (20 000 Ft)!', '', {
        duration: 1500
      });
    }
  }

}
