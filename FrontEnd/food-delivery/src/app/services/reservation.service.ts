import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Reservation } from '../classes/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

private url: string = 'reservation';

  constructor(
    private httpService: HttpService
  ) { }

  public createReservation(reservation: Reservation, id: number): void {
    this.httpService.post<Reservation>(this.url + "/" + id, reservation);
  }

  public getAllReservation(): Promise<Reservation[]>{
    return this.httpService.get<Reservation[]>(this.url);
  }

  public getDeliverReservations(): Promise<Reservation[]>{
    return this.httpService.get<Reservation[]>(this.url + '/deliverReservations');
  }

  public addDelivererToReservation(reservation: number, user: number){
    this.httpService.put<Reservation>(this.url + '/' + reservation + '/deliverer/' + user, {});
  }

}
