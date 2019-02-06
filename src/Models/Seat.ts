import Passenger from "./Passenger";

class Seat {
    get assignedPassenger(): Passenger | null {
        return this._assignedPassenger;
    }

    set assignedPassenger(value: Passenger | null) {
        this._assignedPassenger = value;
        if (this._assignedPassenger.assignedSeat !== this) {
            this._assignedPassenger.assignedSeat = this
        }
    }

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

    getColumnLetter(): string {
        return String.fromCharCode(97 + this._column).toUpperCase();
    }

    private readonly _row: number;

    private readonly _column: number;

    private readonly _boardingGroup: number;

    private _assignedPassenger: Passenger | null;

    private _occupied: Passenger | null;

    /**
     * @param row
     * @param column
     * @param boardingGroup
     * @param assignedPassenger
     * @param occupied
     */
    constructor(row: number, column: number, boardingGroup: number, assignedPassenger: Passenger | null = null, occupied: Passenger | null = null) {
        this._row = row;
        this._column = column;
        this._boardingGroup = boardingGroup;
        this._assignedPassenger = assignedPassenger;
        this._occupied = occupied;
    }
}

export default Seat;