import Plane from "./Plane";
import PassengerFactory from "./PassengerFactory";
import Seat from "./Seat";
import Passenger from "./Passenger";

it('builds a Passenger', () => {
    const plane = new Plane(10, 2, 2);
    const factory = new PassengerFactory(plane.seats);
    const passenger = factory.buildPassenger();

    expect(passenger).toBeInstanceOf(Passenger);
});

it('assigns built Passenger to a seat', () => {
    const plane = new Plane(10, 2, 2);
    const factory = new PassengerFactory(plane.seats);
    const passenger = factory.buildPassenger();

    expect(passenger.assignedSeat).toBeInstanceOf(Seat);
});

it('builds a Passenger with predefined seat', () => {
    const plane = new Plane(2, 1, 2);
    const factory = new PassengerFactory(plane.seats);

    const seat = plane.getSeat(1, 1);
    const passenger = factory.buildPassenger(seat);

    expect(passenger.assignedSeat).toEqual(seat);
});

it('assigns created passenger seats to their passengers', () => {
    const plane = new Plane(5, 2, 2);
    const factory = new PassengerFactory(plane.seats);
    const passengers: Passenger[] = [];

    for (let i = 0; i < 20; i++) {
        passengers.push(factory.buildPassenger());
    }

    expect(plane.seats.filter(seat => seat.assignedPassenger === null).length).toEqual(0);

    passengers.forEach(passenger => {
        expect(plane.getSeat(passenger.assignedSeat.row, passenger.assignedSeat.column).assignedPassenger).toEqual(passenger);
    });
});

it('throws when seats are filled', () => {
    // Create plane with 4 seats
    const plane = new Plane(2, 1, 2);
    const factory = new PassengerFactory(plane.seats);

    expect(() => {
        // Build 5 passengers
        for (let i = 0; i < 5; i++) {
            factory.buildPassenger();
        }
    }).toThrow();
});

it('throws when preassigned seat is taken', () => {
    // Create a seat
    const takenSeat = new Seat(1, 1, 1);

    const factory = new PassengerFactory([takenSeat]);

    expect(() => {
        // Assign filled seat to passenger on build
        factory.buildPassenger(takenSeat);
        factory.buildPassenger(takenSeat);
    }).toThrow();
});
