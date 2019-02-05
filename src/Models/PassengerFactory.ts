import Passenger from "./Passenger";

class PassengerFactory {
    protected idIndex: number;

    buildPassenger(): Passenger {
        return new Passenger(this.idIndex++);
    }

    constructor() {
        this.idIndex = 0;
    }
}

export default PassengerFactory;