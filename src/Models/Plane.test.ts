import Plane from './Plane'
import Lane from "./Lane";
import PassengerFactory from "./PassengerFactory";
import PassengerQueue from "./PassengerQueue";

let globalQueue: PassengerQueue;

beforeEach(() => {
    globalQueue = new PassengerQueue();
});

it('creates the right amount of seats', () => {
    const plane = new Plane(globalQueue, 3, 4, 2);

    expect(plane.seats.length).toEqual(24);
});

it('assigns seat boarding groups', () => {
    const plane = new Plane(globalQueue, 10, 2, 2);

    const firstBoardingGroupSeats = plane.getBoardingGroup(0);

    expect(plane.boardingGroups).toEqual(2);
    expect(firstBoardingGroupSeats.length).toEqual(20);
});

it('creates a lane', () => {
    const plane = new Plane(globalQueue, 10, 2, 2);

    expect(plane.lane).toBeInstanceOf(Lane);
});

it('initializes with correct rows and columns', () => {
    const plane = new Plane(globalQueue, 6, 3, 2);

    expect(plane.rows).toEqual(6);
    expect(plane.columns).toEqual(6);
});

it('gets the current object in given lane row', () => {
    const plane = new Plane(globalQueue, 6, 3, 2);

    expect(plane.getLaneRow(5)).toBeNull();
});

it('gets the correct seat', () => {
    const plane = new Plane(globalQueue, 10, 2, 2);

    const expectedSeat = plane.getSeat(5, 3);

    expect(expectedSeat.row).toEqual(5);
    expect(expectedSeat.column).toEqual(3);
});

it('resets the plane state', () => {
    const plane = new Plane(globalQueue, 10, 2, 2);
    const seat = plane.getSeat(0, 1);
    const passenger = new PassengerFactory(plane).buildPassenger(seat);

    expect(plane.getSeat(0, 1).assignedPassenger).toBe(passenger);

    plane.reset();

    expect(plane.getSeat(0, 1).assignedPassenger).toBeNull();
});