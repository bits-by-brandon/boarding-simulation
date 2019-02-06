"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Plane_1 = require("./Plane");
it('creates the right amount of seats', () => {
    const plane = new Plane_1.default(3, 4, 2);
    expect(plane.seats.length).toEqual(24);
});
it('assigns seat boarding groups', () => {
    const plane = new Plane_1.default(10, 2, 2);
    const firstBoardingGroupSeats = plane.getBoardingGroup(0);
    expect(firstBoardingGroupSeats.length).toEqual(20);
});
it('gets the correct seat', () => {
    const plane = new Plane_1.default(10, 2, 2);
    const expectedSeat = plane.getSeat(5, 3);
    expect(expectedSeat.row).toEqual(5);
    expect(expectedSeat.column).toEqual(3);
});
//# sourceMappingURL=Plane.test.js.map