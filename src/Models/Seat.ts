import Passenger from "./Passenger";

class Seat {
    set occupied(value: Passenger | null) {
        this._occupied = value;
    }
    get seatLabel(): string {
        return this._seatLabel;
    }

    private readonly _row: number;

    private readonly _column: number;

    private readonly _boardingGroup: number;

    private _assignedPassenger: Passenger | null;

    private _occupied: Passenger | null;

    private readonly _seatLabel: string;

    get assignedPassenger(): Passenger | null {
        return this._assignedPassenger;
    }

    set assignedPassenger(value: Passenger | null) {
        this._assignedPassenger = value;
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

    getColumnLetter(): string {
        return String.fromCharCode(97 + this._column).toUpperCase();
    }

    makeSeatLabel(): string {
        return this._row + '-' + this.getColumnLetter();
    }

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
        this._seatLabel = this.makeSeatLabel();
    }
}

export default Seat;