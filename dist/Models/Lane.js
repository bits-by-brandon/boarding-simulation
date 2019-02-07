"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lane {
    constructor(length) {
        this._rows = {};
        for (let r = 0; r < length; r++) {
            this._rows[r] = null;
        }
    }
    get occupied() {
        return Object.keys(this._rows).filter(i => this._rows[parseInt(i)] !== null).length;
    }
    get rows() {
        return this._rows;
    }
    getRow(row) {
        return this._rows[row];
    }
    setRow(newOccupant, row) {
        if (newOccupant === null) {
            this._rows[row] = newOccupant;
            return;
        }
        if (this._rows[row] !== null) {
            throw `Cannot move ${newOccupant.assignedSeat.seatLabel} into lane ${row}. Occupied by ${this.getRow(row)}`;
        }
        if (typeof newOccupant.currentPosition === "number") {
            this._rows[newOccupant.currentPosition] = null;
        }
        this._rows[row] = newOccupant;
    }
}
exports.default = Lane;
//# sourceMappingURL=Lane.js.map