import Passenger from "./Passenger";
import IPassengerSort from "./IPassengerSort";

class PassengerQueue {
    private _passengers: Passenger[] | null;

    constructor(passengers: Passenger[] = []) {
        this._passengers = passengers;
    }

    get length(): number {
        return this._passengers.length;
    }

    add(passenger: Passenger) {
        this._passengers.push(passenger);
    }

    sort(sortStrategy: IPassengerSort): void {
        this._passengers = sortStrategy(this._passengers);
    }

    pop(): Passenger {
        return this._passengers.shift();
    }
}

export default PassengerQueue;