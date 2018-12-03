import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { FormBuilder } from '@angular/forms';
import { fbind } from 'q';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private _products : Product[];

  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this._products = await this._productService.getProducts();
  }
  addToCart(id: number){
    this._cartService.addProductTocart(id);
    this.snackBar.open('A terméket hozzáadtuk a kosárhoz!', '', {
      duration: 1500
    });
  }

}
