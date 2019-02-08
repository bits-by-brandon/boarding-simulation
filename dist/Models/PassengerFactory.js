"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Passenger_1 = require("./Passenger");
const random_1 = require("../utility/random");
const Config_1 = require("../Config");
const config = Config_1.default.getInstance();
class PassengerFactory {
    buildPassenger(seat = null, bags = null) {
        const availableSeats = this._plane.seats.filter(seat => seat.assignedPassenger === null);
        if (availableSeats.length === 0) {
            throw 'All seats are sold out. Cannot create any more passengers';
        }
        const numberOfBags = bags || random_1.default(config.bagMin, config.bagMax);
        let assignedSeat = null;
        if (seat === null) {
            assignedSeat = availableSeats[random_1.default(0, availableSeats.length - 1)];
        }
        else {
            if (!availableSeats.includes(seat)) {
                throw 'Assigned seat is not available';
            }
            assignedSeat = seat;
        }
        const passenger = new Passenger_1.default(this._plane, assignedSeat, numberOfBags);
        passenger.init();
        return passenger;
    }
    constructor(plane) {
        this._plane = plane;
    }
}
exports.default = PassengerFactory;
//# sourceMappingURL=PassengerFactory.js.map