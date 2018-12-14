import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { Product } from '../classes/product';
import { Piece } from '../classes/piece';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  private _user: User;
  private products: Product[] = [];


  constructor(
    private productSevice: ProductService,
    private reservationService: ReservationService,
    private _cartService: CartService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    await this.reservationService.getAllReservation().then((allReservation) => {
      const pieces: Piece[] = [];
      for(let reservation of allReservation){
        for(let piece of reservation.pieces){
          pieces.push(piece);
        }
      }
      const mergePiece: Piece[] = [];
      for(let piece of pieces){
        this.findAndAdd(piece, mergePiece);
      }
      
      var n:number = 0; 
      while(n < 3){
        this.setMax(mergePiece);
        n++;
      }

    });
  }

  private findAndAdd(piece: Piece, array: Piece[]): boolean{
    for(let p of array){
      if(p.product.id == piece.product.id){
        p.piece += piece.piece;
        return
      }
    }
    array.push(piece);
  }

  private setMax(array: Piece[]): void{
    var index = 0;
    var max: Piece = array[index];
    var i: number = 0;
    while(i < array.length){
      if(array[i].piece > max.piece){
        max = array[i];
        index = i;
      }
      i++;
    }
    this.products.push(max.product);
    array.splice(index, 1);

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
