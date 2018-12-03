import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Reservation } from '../classes/reservation';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'user';

  constructor(
    private httpService: HttpService
  ) { }

  public getAllUser(): Promise<User[]>{
    return this.httpService.get<User[]>(this.url);
  }

  public getUserById(id: number): Promise<User>{
    return this.httpService.get<User>(this.url + '/' + id);
  }

  public getReservations(id: number): Promise<Reservation[]>{
    return this.httpService.get<Reservation[]>(this.url + "/" + id + "/reservations");
  }

  public updateUser(user: User){
    this.httpService.put<User>(this.url + "/" + user.id, user);
  }

  public registration(user: User) {
    this.httpService.post<User>(this.url + '/register', user).catch();
  }
  
}
