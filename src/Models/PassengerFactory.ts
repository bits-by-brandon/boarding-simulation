import Passenger from "./Passenger";
import Seat from "./Seat";
import random from "../utility/random";

class PassengerFactory {
    private readonly _availableSeats: Seat[];

    buildPassenger(assignedSeat: Seat|null = null, bags: number|null = null): Passenger {
        if (this._availableSeats.length === 0) {
            throw 'All seats are sold out. Cannot create any more passengers';
        }

        // Randomize the number of bags
        const numberOfBags = bags || random(0, 3);

        if (assignedSeat !== null) {
            if (!this._availableSeats.includes(assignedSeat)) {
                // Create passenger with pre-assigned seat
                return new Passenger(assignedSeat, numberOfBags);
            }
            throw 'Pre-assigned seat is already taken'
        }

        // Select a seat at random
        const seatIndex = random(0, this._availableSeats.length - 1);
        const seat = this._availableSeats[seatIndex];

        // Remove the seat from the available array
        this._availableSeats.splice(seatIndex, 1);

        const passenger = new Passenger(seat, numberOfBags);

        // Assign the seat to the passenger
        seat.assignedPassenger = passenger;

        return passenger;
    }

    constructor(seats: Seat[]) {
        this._availableSeats = seats.slice();
    }
}

export default PassengerFactory;