import Passenger from "./Passenger";

class Lane {

    private _rows: { [key: number]: Passenger | null };

    constructor(length: number) {
        this._rows = {};

        for (let r: number = 0; r < length; r++) {
            this._rows[r] = null;
        }
    }

    get occupied(): Passenger[] {
        return Object.keys(this._rows)
            .filter(i => this._rows[parseInt(i)] !== null)
            .map(key => this._rows[parseInt(key)]);
    }

    get rows(): { [key: number]: Passenger | null } {
        return this._rows;
    }

    getRow(row: number): Passenger | null {
        return this._rows[row];
    }

    setRow(newOccupant: Passenger | null, row: number): void {
        if (newOccupant === null) {
            this._rows[row] = newOccupant;
            return
        }

        if (this._rows[row] !== null) {
            throw `Cannot move ${newOccupant.assignedSeat.seatLabel} into lane ${row}. Occupied by ${this.getRow(row)}`;
        }

        // TODO: Create external "Join table" structure to hold Passenger + Seat relationship

        // unset the last position of the passenger
        if (typeof newOccupant.currentPosition === "number") {
            this._rows[newOccupant.currentPosition] = null;
        }

        this._rows[row] = newOccupant;
    }
}

export default Lane;