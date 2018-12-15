import { Component, OnInit } from '@angular/core';
import { Piece } from '../classes/piece';
import { Reservation } from '../classes/reservation';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-all-reservation',
  templateUrl: './all-reservation.component.html',
  styleUrls: ['./all-reservation.component.css']
})
export class AllReservationComponent implements OnInit {

  private reservations: Reservation[];
  private pieces: Piece[];

  private leftDisplayColumns = ['orderTime', 'message' , 'button'];
  private rightDisplayColumns = ['pic', 'name', 'piece', 'price']


  constructor(
    private reservationService: ReservationService,
  ) { }

  async ngOnInit() {
    this.reservations = await this.reservationService.getAllReservation();
  }

  onClick(id: number){

    for(let reservation of this.reservations){
      if(reservation.id === id){
        this.pieces = reservation.pieces;
      }
    }
  }

}
