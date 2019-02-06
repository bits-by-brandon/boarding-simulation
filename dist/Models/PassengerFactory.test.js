"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Plane_1 = require("./Plane");
const PassengerFactory_1 = require("./PassengerFactory");
const Seat_1 = require("./Seat");
const Passenger_1 = require("./Passenger");
it('builds a Passenger', () => {
    const plane = new Plane_1.default(10, 2, 2);
    const factory = new PassengerFactory_1.default(plane.seats);
    const passenger = factory.buildPassenger();
    expect(passenger).toBeInstanceOf(Passenger_1.default);
});
it('assigns built Passenger to a seat', () => {
    const plane = new Plane_1.default(10, 2, 2);
    const factory = new PassengerFactory_1.default(plane.seats);
    const passenger = factory.buildPassenger();
    expect(passenger.assignedSeat).toBeInstanceOf(Seat_1.default);
});
it('build a Passenger with predefined seat', () => {
    const plane = new Plane_1.default(10, 2, 2);
    const factory = new PassengerFactory_1.default(plane.seats);
    const assignedSeat = new Seat_1.default(5, 6, 1);
    const passenger = factory.buildPassenger(assignedSeat);
    expect(passenger.assignedSeat).toEqual(assignedSeat);
});
it('Assigns created passenger seats to their passengers', () => {
    const plane = new Plane_1.default(5, 2, 2);
    const factory = new PassengerFactory_1.default(plane.seats);
    const passengers = [];
    for (let i = 0; i < 20; i++) {
        passengers.push(factory.buildPassenger());
    }
    expect(plane.seats.filter(seat => seat.assignedPassenger === null).length).toEqual(0);
    passengers.forEach(passenger => {
        expect(plane.getSeat(passenger.assignedSeat.row, passenger.assignedSeat.column).assignedPassenger).toEqual(passenger);
    });
});
it('throws when seats are filled', () => {
    const plane = new Plane_1.default(2, 1, 2);
    const factory = new PassengerFactory_1.default(plane.seats);
    expect(() => {
        for (let i = 0; i < 5; i++) {
            factory.buildPassenger();
        }
    }).toThrow();
});
it('throws when preassigned seat is taken', () => {
    const takenSeat = new Seat_1.default(1, 1, 1);
    const factory = new PassengerFactory_1.default([takenSeat]);
    expect(() => {
        factory.buildPassenger(takenSeat);
    }).toThrow();
});
//# sourceMappingURL=PassengerFactory.test.js.map