import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Category } from '../classes/category';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string = 'category';

  constructor(
    private httpService: HttpService
  ) { }

  public getAllCategory(): Promise<Category[]>{
    return this.httpService.get<Category[]>(this.url);
  }

  public addCategory(category: Category){
    this.httpService.post<Category>(this.url, category);
  }

  public getCategoryById(id: number): Promise<Category>{
    return this.httpService.get<Category>(this.url + '/' + id);
  }

  public putCategory(id: number, category: Category): void{
    this.httpService.put<Category>(this.url + "/" + id, category);
  }

  public addProductToCategory(id: number, product: Product): void{
    this.httpService.post<Product>(this.url + '/' + id + '/product', product)
  }
}
