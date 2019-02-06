"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Passenger {
    get currentPosition() {
        return this._currentPosition;
    }
    set currentPosition(value) {
        this._currentPosition = value;
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