import { Component, OnInit, Output } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Piece } from '../classes/piece';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Output() updateView = new EventEmitter();

  private _pieces: Piece[];
  
  private displayColumns = ['pic', 'productName', 'price', 'pieces', 'button'];
  
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this._pieces = this.cartService.getPieces();
  }

  async onClickDeleteOneProduct(id: number){
    this.cartService.deleteOneProduct(id);
    for(let piece of this._pieces){
      if(piece.id === id){
        const index = this._pieces.indexOf(piece);
        this._pieces.splice(index, 1);
      }
    }
  }

  onClickDelete(){
    this._pieces = [];
    this.cartService.deleteSpaces();
  }
}
