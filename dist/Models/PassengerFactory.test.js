"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Plane_1 = require("./Plane");
const PassengerFactory_1 = require("./PassengerFactory");
const Seat_1 = require("./Seat");
const Passenger_1 = require("./Passenger");
const PassengerQueue_1 = require("./PassengerQueue");
let globalPlane;
let globalFactory;
beforeEach(() => {
    const queue = new PassengerQueue_1.default();
    globalPlane = new Plane_1.default(queue, 4, 2, 1);
    globalFactory = new PassengerFactory_1.default(globalPlane);
});
it('builds a Passenger', () => {
    globalPlane.reset();
    const passenger = globalFactory.buildPassenger();
    expect(passenger).toBeInstanceOf(Passenger_1.default);
});
it('assigns built Passenger to a seat', () => {
    globalPlane.reset();
    const passenger = globalFactory.buildPassenger();
    expect(passenger.assignedSeat).toBeInstanceOf(Seat_1.default);
});
it('builds a Passenger with predefined seat', () => {
    globalPlane.reset();
    const seat = globalPlane.getSeat(1, 1);
    const passenger = globalFactory.buildPassenger(seat);
    expect(passenger.assignedSeat).toEqual(seat);
});
it('assigns created passenger seats to their passengers', () => {
    globalPlane.reset();
    const passengers = [];
    for (let i = 0; i < 16; i++) {
        passengers.push(globalFactory.buildPassenger());
    }
    expect(globalPlane.seats.filter(seat => seat.assignedPassenger === null).length).toEqual(0);
    passengers.forEach(passenger => {
        expect(globalPlane.getSeat(passenger.assignedSeat.row, passenger.assignedSeat.column).assignedPassenger).toEqual(passenger);
    });
});
it('throws when seats are filled', () => {
    globalPlane.reset();
    for (let i = 0; i < 16; i++) {
        expect(globalFactory.buildPassenger()).toBeInstanceOf(Passenger_1.default);
    }
    expect(() => {
        globalFactory.buildPassenger();
    }).toThrow();
});
it('throws when preassigned seat is taken', () => {
    const takenSeat = globalPlane.getSeat(1, 0);
    expect(globalFactory.buildPassenger(takenSeat)).toBeInstanceOf(Passenger_1.default);
    expect(() => {
        globalFactory.buildPassenger(takenSeat);
    }).toThrow();
});
//# sourceMappingURL=PassengerFactory.test.js.map