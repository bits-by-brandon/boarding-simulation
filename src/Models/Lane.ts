import Passenger from "./Passenger";

class Lane {

    private _rows: { [key: number]: Passenger | null };

    constructor(length: number) {
        this._rows = {};

        for (let r: number = 0; r < length; r++) {
            this._rows[r] = null;
        }
    }

    get rows(): { [key: number]: Passenger | null } {
        return this._rows;
    }

    getRow(row: number): Passenger | null {
        return this._rows[row];
    }

    setRow(passenger: Passenger, row: number): void {
        if( this._rows[row] !== null ) {
            throw 'Cannot move into lane position ' + row + '. The row is occupied';
        }
        this._rows[row] = passenger;
    }
}

export default Lane;