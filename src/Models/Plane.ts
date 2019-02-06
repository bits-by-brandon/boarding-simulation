import Seat from "./Seat";
import Lane from "./Lane";

class Plane {
    get lane(): Lane {
        return this._lane;
    }

    private readonly _rows: number;

    private readonly _columns: number;

    private readonly _boardingGroups: number;

    private readonly _seats: Seat[];

    private _lane: Lane;

    constructor(rows: number, columnsPerRowSide: number, boardingGroups: number) {
        this._rows = rows;
        this._columns = columnsPerRowSide * 2;
        this._boardingGroups = boardingGroups;
        this._seats = [];
        this._lane = new Lane(rows);

        const rowsPerGroup = Math.ceil(this._rows / this._boardingGroups);

        for (let r: number = 0; r < rows; r++) {
            const boardingGroup = Math.floor(r / rowsPerGroup);
            for (let c: number = 0; c < this._columns; c++) {
                this._seats.push(new Seat(r, c, boardingGroup))
            }
        }
    }

    get rows(): number {
        return this._rows;
    }

    get columns(): number {
        return this._columns;
    }

    get boardingGroups(): number {
        return this._boardingGroups;
    }

    get seats(): Seat[] {
        return this._seats;
    }

    getLaneRow(row: number) {
        return this._lane.getRow(row);
    }

    getSeat(row: number, column: number) {
        return this._seats.find(seat => (seat.row === row && seat.column === column));
    }

    getBoardingGroup(groupNumber: number): Seat[] {
        return this._seats.filter(seat => seat.boardingGroup === groupNumber)
    }

}

export default Plane;