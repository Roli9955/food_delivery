import { Component, OnInit, Output } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Piece } from '../classes/piece';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private _pieces: Piece[];
  
  private displayColumns = ['pic', 'productName', 'price', 'pieces', 'button'];
  
  constructor(
    private cartService: CartService
  ) { }

  async ngOnInit() {
    this._pieces = await this.cartService.getPieces();
  }

  async onClickDeleteOneProduct(id: number){
    this.cartService.deleteOneProduct(id);
    this._pieces = await this.cartService.getPieces();
  }

  onClickDelete(){
    this._pieces = [];
    this.cartService.deleteSpaces();
  }
}