import Passenger from "./Passenger";

interface IPassengerSort {
    (passengers: Passenger[]): Passenger[];
}

export default IPassengerSort;