import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private registrationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    postCode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    streetNumber: new FormControl('', Validators.required)
  });

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async registration(){
    const name: string = this.registrationForm.get('name').value;
    const email: string = this.registrationForm.get('email').value;
    const password: string = this.registrationForm.get('password').value;
    const phoneNumber: string = this.registrationForm.get('phoneNumber').value;
    const postCode: number = this.registrationForm.get('postCode').value;
    const city: string = this.registrationForm.get('city').value;
    const street: string = this.registrationForm.get('street').value;
    const streetNumber: string = this.registrationForm.get('streetNumber').value;

    if(!name || !password || !email || !phoneNumber || !postCode || !city || !street || !streetNumber){
      return;
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.phoneNumber = phoneNumber;
    user.postCode = postCode;
    user.city = city;
    user.street = street;
    user.streetNumber = streetNumber;
    
    await this.userService.registration(user);

    this.snackBar.open('Regisztráció sikeresen megtörtént!', '', {
      duration: 1500
    });

    this.router.navigate(['']);

  }

}
