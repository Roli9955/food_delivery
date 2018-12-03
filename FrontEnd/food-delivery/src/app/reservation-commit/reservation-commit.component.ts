import { OnInit, Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { CartService } from '../services/cart.service';
import { Piece } from '../classes/piece';
import { MatSnackBar } from '@angular/material';
import { Reservation } from '../classes/reservation';
import { ReservationService } from '../services/reservation.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../classes/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-commit',
  templateUrl: './reservation-commit.component.html',
  styleUrls: ['./reservation-commit.component.css']
})
export class ReservationCommitComponent implements OnInit {

  public _user: User = new User();
  public _pieces: Piece[];

  private displayColumns = ['pic', 'productName', 'price', 'pieces'];

  private reservationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    message: new FormControl(''),
    postCode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    streetNumber: new FormControl('', Validators.required)
  });

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private reservationService: ReservationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  async ngOnInit() {
    this._user = await this.userService.getUserById(4);
    this._pieces = this.cartService.getPieces();

    this.reservationForm.controls['name'].setValue(this._user.name);
    this.reservationForm.controls['email'].setValue(this._user.email);
    this.reservationForm.controls['phoneNumber'].setValue(this._user.phoneNumber);
    this.reservationForm.controls['postCode'].setValue(this._user.postCode);
    this.reservationForm.controls['city'].setValue(this._user.city);
    this.reservationForm.controls['street'].setValue(this._user.street);
    this.reservationForm.controls['streetNumber'].setValue(this._user.streetNumber);
  }

  reservationCommit(){
    const name: string = this.reservationForm.get('name').value;
    const email: string = this.reservationForm.get('email').value;
    const phoneNumber: string = this.reservationForm.get('phoneNumber').value;
    const message: string = this.reservationForm.get('message').value;
    const postCode: number = this.reservationForm.get('postCode').value;
    const city: string = this.reservationForm.get('city').value;
    const street: string = this.reservationForm.get('street').value;
    const streetNumber: string = this.reservationForm.get('streetNumber').value;

    if(!name || !email || !phoneNumber || !postCode || !city || !street || !streetNumber){
      return;
    }

    const reservation: Reservation = new Reservation();
    reservation.pieces = this._pieces;
    reservation.message = message;
    this.reservationService.createReservation(reservation, this._user.id);
    this.cartService.deleteSpaces();

    this.snackBar.open('Rendelését sikeresen rögzítettük!', '', {
      duration: 1500
    });

    this.router.navigate(['']);
  }

}