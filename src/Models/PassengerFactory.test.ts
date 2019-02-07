import Plane from "./Plane";
import PassengerFactory from "./PassengerFactory";
import Seat from "./Seat";
import Passenger from "./Passenger";
import PassengerQueue from "./PassengerQueue";

let globalPlane: Plane;
let globalFactory: PassengerFactory;

beforeEach(() => {
    const queue = new PassengerQueue();
    globalPlane = new Plane(queue, 4, 2, 1);
    globalFactory = new PassengerFactory(globalPlane);
});

it('builds a Passenger', () => {
    globalPlane.reset();
    const passenger = globalFactory.buildPassenger();

    expect(passenger).toBeInstanceOf(Passenger);
});

it('assigns built Passenger to a seat', () => {
    globalPlane.reset();
    const passenger = globalFactory.buildPassenger();

    expect(passenger.assignedSeat).toBeInstanceOf(Seat);
});

it('builds a Passenger with predefined seat', () => {
    globalPlane.reset();
    const seat = globalPlane.getSeat(1, 1);
    const passenger = globalFactory.buildPassenger(seat);

    expect(passenger.assignedSeat).toEqual(seat);
});

it('assigns created passenger seats to their passengers', () => {
    globalPlane.reset();
    const passengers: Passenger[] = [];

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
        expect(globalFactory.buildPassenger()).toBeInstanceOf(Passenger);
    }

    // on the 5th passenger
    expect(() => {
        globalFactory.buildPassenger()
    }).toThrow();
});

it('throws when preassigned seat is taken', () => {
    const takenSeat = globalPlane.getSeat(1, 0);

    expect(globalFactory.buildPassenger(takenSeat)).toBeInstanceOf(Passenger);
    expect(() => {
        globalFactory.buildPassenger(takenSeat);
    }).toThrow();
});
