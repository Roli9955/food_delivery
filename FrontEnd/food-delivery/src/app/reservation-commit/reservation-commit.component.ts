import { OnInit, Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { CartService } from '../services/cart.service';
import { Piece } from '../classes/piece';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reservation-commit',
  templateUrl: './reservation-commit.component.html',
  styleUrls: ['./reservation-commit.component.css']
})
export class ReservationCommitComponent implements OnInit {

  public _user: User;
  public _pieces: Piece[];

  private displayColumns = ['pic', 'productName', 'price', 'pieces'];

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._user = this.userService.getUser();
    this._pieces = this.cartService.getPieces();
  }

  reservationCommit(){

    this.userService.addPiece(this._pieces);
    this.cartService.deleteSpaces();

    this.snackBar.open('Rendelését sikeresen rögzítettük!', '', {
      duration: 1500
    });
  }

}