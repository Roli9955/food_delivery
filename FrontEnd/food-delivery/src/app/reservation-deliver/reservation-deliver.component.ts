import { Component, OnInit, Inject } from '@angular/core';
import { Reservation } from '../classes/reservation';
import { Piece } from '../classes/piece';
import { ReservationService } from '../services/reservation.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface ReservationDialog{
  reservationId: number;
}

@Component({
  selector: 'app-reservation-deliver',
  templateUrl: './reservation-deliver.component.html',
  styleUrls: ['./reservation-deliver.component.css']
})

export class ReservationDeliverComponent implements OnInit {

  private reservations: Reservation[];
  private pieces: Piece[];

  private leftDisplayColumns = ['orderTime', 'message' , 'button'];
  private rightDisplayColumns = ['pic', 'name', 'piece', 'price']

  private enable: boolean = false;
  private activeReservation: number;

  constructor(
    private reservationService: ReservationService,
    private delivererDialog: MatDialog
  ) { }

  async ngOnInit() {
    this.reservations = await this.reservationService.getDeliverReservations();
  }

  onClick(id: number){

    for(let reservation of this.reservations){
      if(reservation.id === id){
        this.pieces = reservation.pieces;
      }
    }

    this.enable = true;
    this.activeReservation = id;
  }

  addDeliverer(){
    const dialogRef = this.delivererDialog.open(ReservationDeliverComponentDialog, {
      width: '40%',
      data: {reservationId: this.activeReservation}
    });

    dialogRef.afterClosed().subscribe(async () => {
      this.reservations = await this.reservationService.getDeliverReservations();
      this.pieces = [];
      this.enable = false;
    });
  }

}

@Component({
  selector: 'app-reservation-add-deliver',
  templateUrl: './reservation-add-deliver.component.html',
  styleUrls: ['./reservation-deliver.component.css']
})

export class ReservationDeliverComponentDialog{

  private deliverer: User[]

  private deliverForm = new FormGroup({
    id: new FormControl('', Validators.required)
  });

  constructor(
    private dialogRef: MatDialogRef<ReservationDeliverComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ReservationDialog,
    private userService: UserService,
    private reservationService: ReservationService
  ) {
    this.addDeliverer();
  }

  async addDeliverer(){
    this.deliverer = await this.userService.getAllUser().then((res: User[]) => {
      var users: User[] = [];
      for(let user of res){
        if(user.role === 'ROLE_DELIVERER'){
          users.push(user);
        }
      }
      return users;
    });
  }

  async saveDeliver(){
    const id: number = parseInt(this.deliverForm.controls['id'].value);
    if(!id){
      return;
    }

    await this.reservationService.addDelivererToReservation(this.data.reservationId, id);

    this.dialogRef.close();
  }

}