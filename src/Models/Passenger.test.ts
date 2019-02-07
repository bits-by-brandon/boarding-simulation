import Passenger from "./Passenger";
import Seat from "./Seat";
import PassengerFactory from "./PassengerFactory";
import Plane from "./Plane";

let globalPlane: Plane;
let globalFactory: PassengerFactory;

beforeEach(() => {
    globalPlane = new Plane(4, 2, 1);
    globalFactory = new PassengerFactory(globalPlane);
});

it('creates a default passenger', () => {
    const passenger = globalFactory.buildPassenger(null, 1);

    expect(passenger).toBeInstanceOf(Passenger);
    expect(passenger.currentPosition).toBeNull();
    expect(passenger.baggageCount).toEqual(1);
});

it('creates a passenger with assigned seat', () => {
    globalPlane.reset();
    const seat = globalPlane.getSeat(1, 1);
    const passenger = globalFactory.buildPassenger(seat);

    expect(seat).toBeInstanceOf(Seat);
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
