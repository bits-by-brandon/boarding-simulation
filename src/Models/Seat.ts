import Passenger from "./Passenger";

class Seat {
    get occupied(): Passenger | null {
        return this._occupied;
    }

    get row(): number {
        return this._row;
    }

    get column(): number {
        return this._column;
    }

    get boardingGroup(): number {
        return this._boardingGroup;
    }

    occupy(passenger: Passenger) {
        this._occupied = passenger;
    }

    private readonly _row: number;

    private readonly _column: number;

    private readonly _boardingGroup: number;

    private _occupied: Passenger|null;

    constructor(row: number, column: number, boardingGroup: number, occupied: Passenger|null = null) {
        this._row = row;
        this._column = column;
        this._boardingGroup = boardingGroup;
        this._occupied = occupied;
    }
}

export default Seat;