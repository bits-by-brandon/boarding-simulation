import Plane from './Plane'
import Lane from "./Lane";

it('creates the right amount of seats', () => {
    const plane = new Plane(3, 4, 2);

    expect(plane.seats.length).toEqual(24);
});

it('assigns seat boarding groups', () => {
    const plane = new Plane(10, 2, 2);

    const firstBoardingGroupSeats = plane.getBoardingGroup(0);

    expect(plane.boardingGroups).toEqual(2);
    expect(firstBoardingGroupSeats.length).toEqual(20);
});

it('creates a lane', () => {
    const plane = new Plane(10, 2, 2);

    expect(plane.lane).toBeInstanceOf(Lane);
});

it('initializes with correct rows and columns', () => {
    const plane = new Plane(6, 3, 2);

    expect(plane.rows).toEqual(6);
    expect(plane.columns).toEqual(6);
});

it('gets the current object in given lane row', () => {
    const plane = new Plane(6, 3, 2);

    expect(plane.getLaneRow(5)).toBeNull();
});

it('gets the correct seat', () => {
    const plane = new Plane(10, 2, 2);

    const expectedSeat = plane.getSeat(5, 3);

    expect(expectedSeat.row).toEqual(5);
    expect(expectedSeat.column).toEqual(3);
});
