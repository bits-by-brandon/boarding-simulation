"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Passenger {
    get assignedSeat() {
        return this._assignedSeat;
    }
    set assignedSeat(value) {
        this._assignedSeat = value;
        if (this._assignedSeat.assignedPassenger !== this) {
            this._assignedSeat.assignedPassenger = this;
        }
    }
    constructor(assignedSeat, baggageCount = 1, currentPosition = null) {
        this._assignedSeat = assignedSeat;
        this._currentPosition = currentPosition;
        this._baggageCount = baggageCount;
    }
    step(plane) {
        if (this._assignedSeat === this._currentPosition) {
            return;
        }
    }
}
exports.default = Passenger;
//# sourceMappingURL=Passenger.js.map