import { Reservation } from "./reservation";

export class User {
    public id: number;
    public name: string;
    public password: string;
    public postCode: number;
    public city: string;
    public street: string;
    public streetNumber: string;
    public reservations: Reservation[];
}
