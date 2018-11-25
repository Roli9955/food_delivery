import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Reservation } from '../classes/reservation';
import { Piece } from '../classes/piece';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User = {
    id: 1,
    email: 'teszt@teszt',
    phone: '0610123456',
    name: 'Kis Pista',
    password: '',
    postCode: 1234,
    city: 'Budapest',
    street: 'Teszt utca',
    streetNumber: '1',
    reservations: [
      {
        id: 1,
        orderTime: new Date('2018-11-25T16:00'),
        message: 'Teszt üzenet a rendeléshez',
        pieces: [{
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
        } as Piece,
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
        } as Piece]
      } as Reservation
    ]
  };

  private _reservation: Reservation = {
    id: null,
    orderTime: null,
    message: null,
    pieces: []
  };

  constructor() { }

  public getUser(): User{
    return this._user;
  }

  public addPiece(pieces: Piece[]){
    for( let piece of pieces ){
      this._reservation.pieces.push(piece);
    }
    this._reservation.orderTime = new Date();
    this._user.reservations.push(this._reservation);
  }
}
