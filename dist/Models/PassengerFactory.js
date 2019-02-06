"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Passenger_1 = require("./Passenger");
const random_1 = require("../utility/random");
class PassengerFactory {
    buildPassenger(seat = null, bags = null) {
        if (this._availableSeats.length === 0) {
            throw 'All seats are sold out. Cannot create any more passengers';
        }
        const numberOfBags = bags || random_1.default(0, 3);
        let assignedSeat = null;
        if (seat === null) {
            assignedSeat = this._availableSeats[random_1.default(0, this._availableSeats.length - 1)];
        }
        else {
            if (!this._availableSeats.includes(seat)) {
                console.log(seat);
                console.log(this._availableSeats);
                throw 'Pre-assigned seat is not available';
            }
            assignedSeat = seat;
        }
        this._availableSeats.splice(this._availableSeats.indexOf(assignedSeat), 1);
        const passenger = new Passenger_1.default(assignedSeat, numberOfBags);
        passenger.init();
        return passenger;
    }
    constructor(seats) {
        this._availableSeats = seats.slice();
    }
}
exports.default = PassengerFactory;
//# sourceMappingURL=PassengerFactory.js.map