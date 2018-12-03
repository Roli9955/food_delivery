import { Reservation } from "./reservation";

export class User {
    public id: number;
    public email: string;
    public name: string;
    public phoneNumber: string;
    public password: string;
    public postCode: number;
    public city: string;
    public street: string;
    public streetNumber: string;
    public reservations: Reservation[];
}
