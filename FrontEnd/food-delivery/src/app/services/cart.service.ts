import { Injectable } from '@angular/core';
import { Piece } from '../classes/piece';

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

  constructor() { }

  public getPieces(): Piece[]{
    return this._pieces;
  }

  public addPiece(piece: Piece){
    this._pieces.push(piece);
  }
}
