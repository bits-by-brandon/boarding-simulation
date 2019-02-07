"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Seat {
    set occupied(value) {
        this._occupied = value;
    }
    get seatLabel() {
        return (this._row + 1) + '-' + String.fromCharCode(97 + this._column).toUpperCase();
    }
    get assignedPassenger() {
        return this._assignedPassenger;
    }
    set assignedPassenger(value) {
        this._assignedPassenger = value;
    }
    get occupied() {
        return this._occupied;
    }
    get row() {
        return this._row;
    }
    get column() {
        return this._column;
    }
    get boardingGroup() {
        return this._boardingGroup;
    }
    constructor(row, column, boardingGroup, assignedPassenger = null, occupied = null) {
        this._row = row;
        this._column = column;
        this._boardingGroup = boardingGroup;
        this._assignedPassenger = assignedPassenger;
        this._occupied = occupied;
    }
}
exports.default = Seat;
//# sourceMappingURL=Seat.js.map