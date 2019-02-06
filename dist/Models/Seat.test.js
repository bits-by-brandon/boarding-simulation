"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Seat_1 = require("./Seat");
const Passenger_1 = require("./Passenger");
it('initializes a seat with correct values', () => {
    const seat = new Seat_1.default(1, 2, 1);
    expect(seat.row).toEqual(1);
    expect(seat.column).toEqual(2);
});
it('returns the correct seat label', () => {
    const seat = new Seat_1.default(2, 4, 1);
    expect(seat.seatLabel).toEqual('2-E');
});
it('returns information about its occupied state', () => {
    const seat = new Seat_1.default(2, 4, 1);
    const passenger = new Passenger_1.default(seat, 1, null);
    expect(seat.occupied).toBeNull();
    passenger.sit(seat);
    expect(seat.occupied).toBe(passenger);
});
it('assigns a new passenger', () => {
    const oldSeat = new Seat_1.default(1, 4, 1);
    const seat = new Seat_1.default(2, 4, 1);
    const passenger = new Passenger_1.default(oldSeat, 1, null);
    passenger.init();
    expect(seat.assignedPassenger).toBeNull();
    expect(oldSeat.assignedPassenger).toBe(passenger);
    seat.assignedPassenger = passenger;
    expect(seat.assignedPassenger).toBe(passenger);
});
//# sourceMappingURL=Seat.test.js.map