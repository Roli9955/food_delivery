import { Injectable } from '@angular/core';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products: Product[] = [
    {id: 1, name: 'Hamburger', price: 1000, outOfOrder: false, description: 'Finom', category: null, url: '../../img/hamburger.jpeg'} as Product,
    {id: 2, name: 'Palacsinta', price: 1000, outOfOrder: false, description: 'Nagyon Finom', category: null, url: '../../img/pancake.jpeg'} as Product,
    {id: 3, name: 'Saláta', price: 1000, outOfOrder: true, description: '-', category: null, url: '../../img/salad.jpg'} as Product,
    {id: 4, name: 'Lazac', price: 1000, outOfOrder: false, description: 'Drága', category: null, url: '../../img/salmon.jpeg'} as Product,
    {id: 5, name: 'Taco', price: 1000, outOfOrder: true, description: '-', category: null, url: '../../img/taco.jpeg'} as Product
  ];

  private _famousProduct: Product[] = [
    {id: 1, name: 'Hamburger', price: 1000, outOfOrder: false, description: 'Finom', category: null, url: '../../img/hamburger.jpeg'} as Product,
    {id: 2, name: 'Palacsinta', price: 1000, outOfOrder: false, description: 'Nagyon Finom', category: null, url: '../../img/pancake.jpeg'} as Product,
    {id: 3, name: 'Saláta', price: 1000, outOfOrder: true, description: '-', category: null, url: '../../img/salad.jpg'} as Product,
  ];

  constructor() { }

  public getProducts(): Product[] {
    return this._products;
  }

  public getProductById(id: number): Product{
    return this._products.find((product: Product) => product.id == id);
  }

  public getFamousProduct(): Product[]{
    return this._famousProduct;
  }
}
