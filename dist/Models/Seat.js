"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Seat {
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
    occupy(passenger) {
        this._occupied = passenger;
    }
    constructor(row, column, boardingGroup, occupied = null) {
        this._row = row;
        this._column = column;
        this._boardingGroup = boardingGroup;
        this._occupied = occupied;
    }
}
exports.default = Seat;
//# sourceMappingURL=Seat.js.map