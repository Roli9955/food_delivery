import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';
import { Product } from '../classes/product';
import { Piece } from '../classes/piece';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  private _user: User;
  private products: Product[] = [];

  map = new Map<Product, number>() ;

  constructor(
    private userService: UserService,
    private productSevice: ProductService
  ) { }

  ngOnInit() {
    this._user = this.userService.getUser();
    this.map.clear();
    this.products = this.productSevice.getFamousProduct();
  }

  
}
