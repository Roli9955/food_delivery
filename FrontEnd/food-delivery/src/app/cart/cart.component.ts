import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../classes/product';
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

  private _pieces: Piece[] = [];
  

  private displayColumns = ['pic', 'productName', 'price', 'pieces', 'button'];

  private _piece: Piece = {
    id: null,
    piece: 1,
    product: null
  };
  
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    const id: number = parseInt(this.router.snapshot.paramMap.get('id'));
    this._pieces = this.cartService.getPieces();

    if(!isNaN(id)) {
      const product: Product = this.productService.getProductById(id);

      const size: number = this._pieces.length;
      console.log('Méret' + size);
      for(let p of this._pieces){
        if(p.product.id === product.id){
          p.piece = p.piece + 1;
          return;
        }
      }
      this._piece.id = size + 1;
      this._piece.product = product;
      this.cartService.addPiece(this._piece);
    } 
  }

  onClick(event){
    /*const id: number = event.path[0].id;
    const piece: Piece = this._pieces.find((piece: Piece) => piece.id == id)
    const index: number = piece.id;
    this._pieces.splice(index-1);
    console.log('Törlés: '+index);
    console.log(this._pieces[index]);*/
    
  }

  onKey(event){
    
    
  }
}
