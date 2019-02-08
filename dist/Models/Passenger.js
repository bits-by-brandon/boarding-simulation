"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const config = Config_1.default.getInstance();
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
    get status() {
        return this._status;
    }
    constructor(plane, assignedSeat = null, baggageCount = 1, currentPosition = null) {
        this._assignedSeat = assignedSeat;
        this._currentPosition = currentPosition;
        this._baggageCount = baggageCount;
        this._plane = plane;
        this._taskQueue = [];
    }
    init() {
        if (this._assignedSeat !== null) {
            this._assignedSeat.assignedPassenger = this;
        }
    }
    update() {
        if (this._taskQueue.length > 0) {
            this.performTask();
            return;
        }
        this.queueTasks();
        if (this._taskQueue.length > 0) {
            this.performTask();
            return;
        }
    }
    queueTasks() {
        if (this._assignedSeat === this._currentPosition) {
            return;
        }
        if (this.currentPosition === this._assignedSeat.row) {
            if (this._baggageCount > 0) {
                this.queueStowBag();
                return;
            }
            this.queueSit(this._assignedSeat);
            return;
        }
        if (typeof this._currentPosition === 'number'
            && this._plane.getLaneRow(this._currentPosition + 1) === null) {
            this.queueMove();
            return;
        }
        this._status = 'waiting';
    }
    performTask() {
        const task = this._taskQueue[0];
        task.time--;
        this._status = task.title;
        if (task.time <= 0) {
            this._taskQueue.shift();
            task.callback();
        }
    }
    queueSit(targetSeat) {
        if (targetSeat.occupied !== null) {
            return false;
        }
        const blockingSeats = this._plane.getSeatsInRow(targetSeat.row)
            .filter(seat => seat.occupied !== null)
            .filter(seat => {
            if (this._plane.getSeatSide(targetSeat) === 'left') {
                return seat.column > this._assignedSeat.column && seat.column < (this._plane.columns / 2);
            }
            else {
                return seat.column < this._assignedSeat.column && seat.column >= (this._plane.columns / 2);
            }
        });
        this._taskQueue.push({
            time: blockingSeats.length * config.seatShufflePenalty,
            title: 'shuffling',
            callback: () => {
                this.sit(this._assignedSeat);
            }
        });
    }
    sit(targetSeat) {
        if (targetSeat.occupied !== null) {
            return false;
        }
        if (typeof this._currentPosition === "number") {
            this._plane.setLaneRow(this._currentPosition, null);
        }
        this._status = 'seated';
        targetSeat.occupied = this;
        this._currentPosition = targetSeat;
        return true;
    }
    queueStowBag() {
        this._taskQueue.push({
            time: config.stepsPerBag,
            title: 'stowing',
            callback: () => {
                this._baggageCount--;
            }
        });
    }
    queueMove() {
        if (typeof this._currentPosition === 'number') {
            const nextRow = this._currentPosition + 1;
            this._taskQueue.push({
                time: 1,
                title: 'moving',
                callback: () => this.move(nextRow)
            });
        }
    }
    move(nextRow) {
        console.log(`passenger ${this._assignedSeat.seatLabel} is moving to ${nextRow}`);
        this._status = 'move';
        this._plane.setLaneRow(nextRow, this);
        this._currentPosition = nextRow;
    }
}
exports.default = Passenger;
//# sourceMappingURL=Passenger.js.map