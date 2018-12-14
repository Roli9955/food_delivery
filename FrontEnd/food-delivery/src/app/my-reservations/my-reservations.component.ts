import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Reservation } from '../classes/reservation';
import { Piece } from '../classes/piece';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  private reservations: Reservation[];
  private pieces: Piece[];

  private leftDisplayColumns = ['orderTime', 'message' , 'button'];
  private rightDisplayColumns = ['pic', 'name', 'piece', 'price']


  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.reservations = await this.userService.getReservations(this.authService.getUser().id);
  }

  onClick(id: number){
    console.log(id);

    for(let reservation of this.reservations){
      if(reservation.id === id){
        this.pieces = reservation.pieces;
      }
    }
  }

}
