import Passenger from "./Passenger";
import Seat from "./Seat";
import random from "../utility/random";
import Plane from "./Plane";
import Config from "../Config";

const config = Config.getInstance();

class PassengerFactory {

    private readonly _plane: Plane;

    buildPassenger(seat: Seat | null = null, bags: number | null = null): Passenger {

        const availableSeats = this._plane.seats.filter(seat => seat.assignedPassenger === null);

        if (availableSeats.length === 0) {
            throw 'All seats are sold out. Cannot create any more passengers';
        }

        // Randomize the number of bags
        const numberOfBags = bags || random(config.bagMin, config.bagMax);

        let assignedSeat: Seat | null = null;

        if (seat === null) {
            // Select a seat at random
            assignedSeat = availableSeats[random(0, availableSeats.length - 1)];

        } else {

            if (!availableSeats.includes(seat)) {
                throw 'Assigned seat is not available'
            }

            assignedSeat = seat;
        }

        const passenger = new Passenger(this._plane, assignedSeat, numberOfBags);

        passenger.init();

        return passenger;
    }

    constructor(plane: Plane) {
        this._plane = plane;
    }
}

export default PassengerFactory;