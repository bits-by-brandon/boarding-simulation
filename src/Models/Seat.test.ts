import Seat from "./Seat";
import Passenger from "./Passenger";

it('initializes a seat with correct values', () => {
    const seat = new Seat(1, 2, 1);

    expect(seat.row).toEqual(1);
    expect(seat.column).toEqual(2);
});

it('returns the correct seat label', () => {
    const seat = new Seat(2, 4, 1);

    expect(seat.seatLabel).toEqual('2-E');
});

it('returns information about its occupied state', () => {
    const seat = new Seat(2, 4, 1);
    const passenger = new Passenger(seat, 1, null);

    expect(seat.occupied).toBeNull();

    passenger.sit(seat);

    expect(seat.occupied).toBe(passenger);
});

it('assigns a new passenger', () => {
    const oldSeat = new Seat(1, 4, 1);
    const seat = new Seat(2, 4, 1);
    const passenger = new Passenger(oldSeat, 1, null);
    passenger.init();

    expect(seat.assignedPassenger).toBeNull();
    expect(oldSeat.assignedPassenger).toBe(passenger);

    seat.assignedPassenger = passenger;
    expect(seat.assignedPassenger).toBe(passenger);
});
