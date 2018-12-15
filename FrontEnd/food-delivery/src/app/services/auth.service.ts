import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../classes/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  private user: User = null;
  

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  public getIsLoggesIn(): boolean{
    return this.isLoggedIn;
  }

  public getUser(): User{
    return this.user;
  }

  public async login(username: string, password: string): Promise<User> {
    try {
      const token = btoa(username + ':' + password);
      window.localStorage.setItem('token', token);
      const user: User = await this.httpService.put('user/login', username) as User;
      this.isLoggedIn = true;
      this.user = user;
      return Promise.resolve(user);
    } catch (e) {
      window.localStorage.setItem('token', '');
      return Promise.reject();
    }
  }

  public logout() {
    this.isLoggedIn = false;
    this.user = null;
    window.localStorage.setItem('token', '');
    this.router.navigate(['/']);
  }

  public loginWithToken() {
    const token = window.localStorage.getItem('token');
    const [username, password] = atob(token).split(':');
    this.login(username, password);
  }
}