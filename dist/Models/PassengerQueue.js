"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PassengerQueue {
    constructor(passengers = []) {
        this._passengers = passengers;
    }
    get length() {
        return this._passengers.length;
    }
    add(passenger) {
        this._passengers.push(passenger);
    }
    sort(sortStrategy) {
        this._passengers = sortStrategy(this._passengers);
    }
    pop() {
        return this._passengers.shift();
    }
}
exports.default = PassengerQueue;
//# sourceMappingURL=PassengerQueue.js.map