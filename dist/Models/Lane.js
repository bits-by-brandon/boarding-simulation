"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lane {
    constructor(length) {
        this._rows = {};
        for (let r = 0; r < length; r++) {
            this._rows[r] = null;
        }
    }
    get rows() {
        return this._rows;
    }
    getRow(row) {
        return this._rows[row];
    }
    setRow(passenger, row) {
        if (this._rows[row] !== null) {
            throw 'Cannot move into lane position ' + row + '. The row is occupied';
        }
        this._rows[row] = passenger;
    }
}
exports.default = Lane;
//# sourceMappingURL=Lane.js.map