import Passenger from "./Passenger";

class PassengerQueue {
    private _passengers: Passenger[] | null;

    constructor(passengers: Passenger[] | null = null) {
        this._passengers = passengers
    }

    add(passenger: Passenger) {
        this._passengers.push(passenger);
    }

    sort(strategy: IPassengerSort) {
dd
    }
}