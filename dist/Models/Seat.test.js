"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Seat_1 = require("./Seat");
const Passenger_1 = require("./Passenger");
const PassengerQueue_1 = require("./PassengerQueue");
const Plane_1 = require("./Plane");
const PassengerFactory_1 = require("./PassengerFactory");
let globalPlane;
let globalFactory;
beforeEach(() => {
    const queue = new PassengerQueue_1.default();
    globalPlane = new Plane_1.default(queue, 4, 2, 1);
    globalFactory = new PassengerFactory_1.default(globalPlane);
});
it('initializes a seat with correct values', () => {
    const seat = new Seat_1.default(1, 2, 1);
    expect(seat.row).toEqual(1);
    expect(seat.column).toEqual(2);
});
it('returns the correct seat label', () => {
    const seat = new Seat_1.default(2, 4, 1);
    expect(seat.seatLabel).toEqual('3-E');
});
it('returns information about its occupied state', () => {
    globalPlane.reset();
    const seat = globalPlane.getSeat(1, 2);
    const passenger = globalFactory.buildPassenger(seat);
    expect(seat.occupied).toBeNull();
    passenger.sit(seat);
    expect(seat.occupied).toBe(passenger);
});
it('assigns a new passenger', () => {
    const oldSeat = new Seat_1.default(1, 4, 1);
    const seat = new Seat_1.default(2, 4, 1);
    const passenger = new Passenger_1.default(null, oldSeat, 1, null);
    passenger.init();
    expect(seat.assignedPassenger).toBeNull();
    expect(oldSeat.assignedPassenger).toBe(passenger);
    seat.assignedPassenger = passenger;
    expect(seat.assignedPassenger).toBe(passenger);
});
//# sourceMappingURL=Seat.test.js.map