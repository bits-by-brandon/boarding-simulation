import IPassengerSort from "../Models/IPassengerSort";
import Passenger from "../Models/Passenger";

const frontToBackRow: IPassengerSort = (passengers: Passenger[]): Passenger[] => {
    return passengers.sort((a, b) => a.assignedSeat.row - b.assignedSeat.row)
};

export default frontToBackRow;
