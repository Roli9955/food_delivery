import { Category } from './category';

export class Product {
    public id: number;
    public name: string;
    public price: number;
    public outOfOrder: boolean;
    public description: string;
    public category: Category;
    public url: string;
    public vegetarian: boolean;
    public hot: boolean;
}
