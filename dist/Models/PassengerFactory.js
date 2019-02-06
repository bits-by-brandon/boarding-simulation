"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Passenger_1 = require("./Passenger");
const random_1 = require("../utility/random");
class PassengerFactory {
    buildPassenger() {
        if (this._availableSeats.length === 0) {
            throw 'All seats are sold out. Cannot create any more passengers';
        }
        const assignedIndex = random_1.default(0, this._availableSeats.length - 1);
        const assignedSeat = this._availableSeats[assignedIndex];
        this._availableSeats.splice(assignedIndex, 1);
        const numberOfBags = random_1.default(0, 3);
        return new Passenger_1.default(assignedSeat, numberOfBags);
    }
    constructor(seats) {
        this._availableSeats = seats;
    }
}
exports.default = PassengerFactory;
//# sourceMappingURL=PassengerFactory.js.map