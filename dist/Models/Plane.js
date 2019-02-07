"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Seat_1 = require("./Seat");
const Lane_1 = require("./Lane");
class Plane {
    get lane() {
        return this._lane;
    }
    constructor(rows, columnsPerRowSide, boardingGroups) {
        this._rows = rows;
        this._columns = columnsPerRowSide * 2;
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
    getLaneRow(row) {
        return this._lane.getRow(row);
    }
    getSeat(row, column) {
        return this._seats.find(seat => (seat.row === row && seat.column === column));
    }
    getBoardingGroup(groupNumber) {
        return this._seats.filter(seat => seat.boardingGroup === groupNumber);
    }
    reset() {
        this._seats.forEach(seat => {
            seat.assignedPassenger = null;
        });
    }
}
exports.default = Plane;
//# sourceMappingURL=Plane.js.map