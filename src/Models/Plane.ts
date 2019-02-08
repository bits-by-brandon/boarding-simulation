import Seat from "./Seat";
import Lane from "./Lane";
import Passenger from "./Passenger";
import PassengerQueue from "./PassengerQueue";

class Plane {
    private readonly _queue: PassengerQueue;

    private readonly _rows: number;

    private readonly _columns: number;

    private readonly _boardingGroups: number;

    private readonly _seats: Seat[];

    private readonly _lane: Lane;

    constructor(queue: PassengerQueue, rows: number, columnsPerSide: number, boardingGroups: number) {
        this._queue = queue;
        this._rows = rows;
        this._columns = columnsPerSide * 2;
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

    get lane(): Lane {
        return this._lane;
    }

    get queue(): PassengerQueue {
        return this._queue;
    }

    getLaneRow(row: number): Passenger | null {
        return this._lane.getRow(row);
    }

    setLaneRow(row: number, occupant: Passenger | null): void {
        return this._lane.setRow(occupant, row);
    }

    getSeat(row: number, column: number): Seat {
        return this._seats.find(seat => (seat.row === row && seat.column === column));
    }

    getSeatSide(seat: Seat): string {
        return (seat.column < (this._columns / 2)) ? 'left' : 'right';
    }

    getSeatsInRow(row: number): Seat[] {
        let seats = [];
        for (let c = 0; c < this.columns; c++) {
            seats.push(this.getSeat(row, c));
        }
        return seats;
    }

    getBoardingGroup(groupNumber: number): Seat[] {
        return this._seats.filter(seat => seat.boardingGroup === groupNumber)
    }

    update(): void {
        // For each passenger in the row, run their step method
        Object.keys(this._lane.rows)
            .map(rowIndex => this._lane.getRow(parseInt(rowIndex)))
            .filter(objectAtRow => objectAtRow !== null)
            .forEach(passengerAtRow => {
                passengerAtRow.update();
            });

        // If the first spot on the plane is available
        if (this._lane.getRow(0) === null) {
            // Move the next passenger in the queue to the plane lane
            if (this._queue.length > 0) {
                const boardedPassenger = this._queue.pop();
                boardedPassenger.currentPosition = 0;
                this._lane.setRow(boardedPassenger, 0);
            }
        }
    }

    /**
     * Set all seat assignments to null and clear the lane
     */
    reset(): void {
        this._seats.forEach(seat => {
            seat.assignedPassenger = null;
        });

        //TODO: clear out the lane and the queue
    }

}

export default Plane;