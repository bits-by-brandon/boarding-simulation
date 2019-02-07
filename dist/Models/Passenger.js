"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Passenger {
    get currentPosition() {
        return this._currentPosition;
    }
    set currentPosition(newPosition) {
        if (typeof this._currentPosition === "number") {
            this._plane.setLaneRow(this._currentPosition, null);
        }
        this._currentPosition = newPosition;
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
    step() {
        if (this._assignedSeat === this._currentPosition) {
            return;
        }
        if (this.currentPosition === this._assignedSeat.row) {
            if (this._baggageCount > 0) {
                console.log(`passenger ${this._assignedSeat.seatLabel} is stowing`);
                this._baggageCount--;
                return;
            }
            console.log(`passenger ${this._assignedSeat.seatLabel} is sitting`);
            this.sit(this._assignedSeat);
            return;
        }
        if (typeof this._currentPosition === 'number'
            && this._plane.getLaneRow(this._currentPosition + 1) === null) {
            const nextRow = this._currentPosition + 1;
            console.log(`passenger ${this._assignedSeat.seatLabel} is moving to ${nextRow}`);
            this._plane.setLaneRow(nextRow, this);
            this._currentPosition = nextRow;
            return;
        }
        console.log(`passenger ${this._assignedSeat.seatLabel} is waiting`);
    }
    sit(seat) {
        if (seat.occupied !== null) {
            return false;
        }
        if (typeof this._currentPosition === "number") {
            this._plane.setLaneRow(this._currentPosition, null);
        }
        seat.occupied = this;
        this._currentPosition = seat;
        return true;
    }
}
exports.default = Passenger;
//# sourceMappingURL=Passenger.js.map