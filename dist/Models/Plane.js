"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Seat_1 = require("./Seat");
const Lane_1 = require("./Lane");
class Plane {
    constructor(queue, rows, columnsPerSide, boardingGroups) {
        this._queue = queue;
        this._rows = rows;
        this._columns = columnsPerSide * 2;
        this._boardingGroups = boardingGroups;
        this._seats = [];
        this._lane = new Lane_1.default(rows);
        const rowsPerGroup = Math.ceil(this._rows / this._boardingGroups);
        for (let r = 0; r < rows; r++) {
            const boardingGroup = Math.floor(r / rowsPerGroup);
            for (let c = 0; c < this._columns; c++) {
                this._seats.push(new Seat_1.default(r, c, boardingGroup));
            }
        }
    }
    get rows() {
        return this._rows;
    }
    get columns() {
        return this._columns;
    }
    get boardingGroups() {
        return this._boardingGroups;
    }
    get seats() {
        return this._seats;
    }
    get lane() {
        return this._lane;
    }
    get queue() {
        return this._queue;
    }
    getLaneRow(row) {
        return this._lane.getRow(row);
    }
    setLaneRow(row, occupant) {
        return this._lane.setRow(occupant, row);
    }
    getSeat(row, column) {
        return this._seats.find(seat => (seat.row === row && seat.column === column));
    }
    getBoardingGroup(groupNumber) {
        return this._seats.filter(seat => seat.boardingGroup === groupNumber);
    }
    update() {
        Object.keys(this._lane.rows)
            .map(rowIndex => this._lane.getRow(parseInt(rowIndex)))
            .filter(objectAtRow => objectAtRow !== null)
            .forEach(passengerAtRow => {
            passengerAtRow.step();
        });
        if (this._lane.getRow(0) === null) {
            if (this._queue.length > 0) {
                const boardedPassenger = this._queue.pop();
                boardedPassenger.currentPosition = 0;
                this._lane.setRow(boardedPassenger, 0);
            }
        }
    }
    reset() {
        this._seats.forEach(seat => {
            seat.assignedPassenger = null;
        });
    }
}
exports.default = Plane;
//# sourceMappingURL=Plane.js.map