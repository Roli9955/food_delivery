import { Piece } from "./piece";

export class Reservation {
    public id: number;
    public orderTime: Date;
    public message: string;
    public pieces: Piece[];
}
