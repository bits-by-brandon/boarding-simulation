import Passenger from "./Passenger";
import Seat from "./Seat";
import random from "../utility/random";

class PassengerFactory {
    private readonly _availableSeats: Seat[];

    buildPassenger(): Passenger {
        if (this._availableSeats.length === 0) {
            throw 'All seats are sold out. Cannot create any more passengers';
        }

        // Select a seat at random
        const assignedIndex = random(0, this._availableSeats.length - 1);
        const assignedSeat = this._availableSeats[assignedIndex];

        // Remove the seat from the available array
        this._availableSeats.splice(assignedIndex, 1);

        // console.log(`Seat ${assignedSeat.row}-${assignedSeat.getColumnLetter()} assigned. ${this._availableSeats.length} seats remaining.`);

        // Randomize the number of bags
        const numberOfBags = random(0, 3);

        return new Passenger(assignedSeat, numberOfBags);
    }

    constructor(seats: Seat[]) {
        this._availableSeats = seats;
    }
}

export default PassengerFactory;