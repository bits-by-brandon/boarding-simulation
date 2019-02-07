"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Passenger {
    get currentPosition() {
        return this._currentPosition;
    }
    get baggageCount() {
        return this._baggageCount;
    }
    get assignedSeat() {
        return this._assignedSeat;
    }
    set assignedSeat(value) {
        if (this._assignedSeat !== null) {
            this._assignedSeat.assignedPassenger = null;
        }
        this._assignedSeat = value;
        if (this._assignedSeat.assignedPassenger !== this) {
            this._assignedSeat.assignedPassenger = this;
        }
    }
    constructor(plane, assignedSeat = null, baggageCount = 1, currentPosition = null) {
        this._assignedSeat = assignedSeat;
        this._currentPosition = currentPosition;
        this._baggageCount = baggageCount;
        this._plane = plane;
    }
    init() {
        if (this._assignedSeat !== null) {
            this._assignedSeat.assignedPassenger = this;
        }
    }
    step(plane) {
        if (this._assignedSeat === this._currentPosition) {
            return;
        }
    }
    sit(seat) {
        if (seat.occupied !== null) {
            return false;
        }
        seat.occupied = this;
        this._currentPosition = seat;
        return true;
    }
}
exports.default = Passenger;
//# sourceMappingURL=Passenger.js.map