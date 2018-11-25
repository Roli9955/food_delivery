import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  private _user: User;

  private leftDisplayColumns = ['id', 'orderTime', 'message'];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this._user = this.userService.getUser();
  }

}
