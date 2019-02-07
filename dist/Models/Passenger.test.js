"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Passenger_1 = require("./Passenger");
const Seat_1 = require("./Seat");
const PassengerFactory_1 = require("./PassengerFactory");
const Plane_1 = require("./Plane");
let globalPlane;
let globalFactory;
beforeEach(() => {
    globalPlane = new Plane_1.default(4, 2, 1);
    globalFactory = new PassengerFactory_1.default(globalPlane);
});
it('creates a default passenger', () => {
    const passenger = globalFactory.buildPassenger(null, 1);
    expect(passenger).toBeInstanceOf(Passenger_1.default);
    expect(passenger.currentPosition).toBeNull();
    expect(passenger.baggageCount).toEqual(1);
});
it('creates a passenger with assigned seat', () => {
    globalPlane.reset();
    const seat = globalPlane.getSeat(1, 1);
    const passenger = globalFactory.buildPassenger(seat);
    expect(seat).toBeInstanceOf(Seat_1.default);
    expect(passenger.assignedSeat).toBe(seat);
});
it('updates assigned seat', () => {
    globalPlane.reset();
    const seat1 = globalPlane.getSeat(1, 0);
    const seat2 = globalPlane.getSeat(1, 1);
    const passenger = globalFactory.buildPassenger(seat1);
    expect(passenger.assignedSeat).toBe(seat1);
    passenger.assignedSeat = seat2;
    expect(passenger.assignedSeat).toBe(seat2);
});
it('takes a step', () => {
    globalPlane.reset();
    const seat1 = globalPlane.getSeat(2, 1);
    const passenger = globalFactory.buildPassenger(seat1);
    expect(passenger.assignedSeat).toBe(seat1);
});
//# sourceMappingURL=Passenger.test.js.map