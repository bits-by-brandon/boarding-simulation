"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Passenger_1 = require("./Passenger");
const random_1 = require("../utility/random");
class PassengerFactory {
    buildPassenger(assignedSeat = null, bags = null) {
        if (this._availableSeats.length === 0) {
            throw 'All seats are sold out. Cannot create any more passengers';
        }
        const numberOfBags = bags || random_1.default(0, 3);
        if (assignedSeat !== null) {
            if (!this._availableSeats.includes(assignedSeat)) {
                return new Passenger_1.default(assignedSeat, numberOfBags);
            }
            throw 'Pre-assigned seat is already taken';
        }
        const seatIndex = random_1.default(0, this._availableSeats.length - 1);
        const seat = this._availableSeats[seatIndex];
        this._availableSeats.splice(seatIndex, 1);
        const passenger = new Passenger_1.default(seat, numberOfBags);
        seat.assignedPassenger = passenger;
        return passenger;
    }
    constructor(seats) {
        this._availableSeats = seats.slice();
    }
}
exports.default = PassengerFactory;
//# sourceMappingURL=PassengerFactory.js.map