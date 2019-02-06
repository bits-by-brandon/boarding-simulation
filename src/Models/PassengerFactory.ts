import Passenger from "./Passenger";
import Seat from "./Seat";
import random from "../utility/random";

class PassengerFactory {
    private readonly _availableSeats: Seat[];

    buildPassenger(seat: Seat | null = null, bags: number | null = null): Passenger {
        if (this._availableSeats.length === 0) {
            throw 'All seats are sold out. Cannot create any more passengers';
        }

        // Randomize the number of bags
        const numberOfBags = bags || random(0, 3);

        let assignedSeat: Seat | null = null;

        if (seat === null) {
            // Select a seat at random
            assignedSeat = this._availableSeats[random(0, this._availableSeats.length - 1)];

        } else {

            if (!this._availableSeats.includes(seat)) {
                throw 'Pre-assigned seat is not available'
            }

            assignedSeat = seat;
        }

        // Remove the seat from the available array
        this._availableSeats.splice(this._availableSeats.indexOf(assignedSeat), 1);

        const passenger = new Passenger(assignedSeat, numberOfBags);

        passenger.init();

        return passenger;
    }

    constructor(seats: Seat[]) {
        this._availableSeats = seats.slice();
    }
}

export default PassengerFactory;