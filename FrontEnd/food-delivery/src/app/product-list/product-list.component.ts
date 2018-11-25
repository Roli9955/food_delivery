import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { FormBuilder } from '@angular/forms';
import { fbind } from 'q';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private _products : Product[];

  private productButton = this.fb.group({
    button: ['']
  })

  constructor(
    private _productService: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this._products = this._productService.getProducts();
  }
  addToCart(){
    const id: number = parseInt(this.productButton.get('button').value);
    console.log(id);
  }

}
