import { Injectable } from '@angular/core';
import { Piece } from '../classes/piece';
import { ProductService } from './product.service';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _pieces: Piece[] = [
    {
      id: 1,
      piece: 1,
      product: {
        id: 1, 
        name: 'Hamburger', 
        price: 1000, 
        outOfOrder: false, 
        description: 'Finom', 
        category: null, 
        url: '../../img/hamburger.jpeg'
      }
    },
    {
      id: 2,
      piece: 2,
      product: {
        id: 4, 
        name: 'Lazac', 
        price: 1000, 
        outOfOrder: false, 
        description: 'Drága', 
        category: null, 
        url: '../../img/salmon.jpeg'
      }
    }
  ];

  constructor(
    private productService: ProductService
  ) { }

  public getPieces(): Piece[]{
    return this._pieces;
  }

  public addPiece(piece: Piece){
    this._pieces.push(piece);
  }

  public deleteOneProduct(id: number){
    for(let p of this._pieces){
      if(p.id === id){
        const index = this._pieces.indexOf(p);
        this._pieces.splice(index, 1);
      }
    }
  }

  async addProductTocart(id: number){
    const product = await this.productService.getProductById(id).then((reason: Product) => {
      const size: number = this._pieces.length;
      for(let p of this._pieces){
        if(p.product.id === reason.id){
          p.piece += 1;
          return;
        }
      }
      const piece: Piece= new Piece();
      piece.id = size + 1;
      piece.piece = 1;
      piece.product = reason;
      this.addPiece(piece);
    });      
    
  }

  public deleteSpaces(){
    this._pieces = [];
  }
}
