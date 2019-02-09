import IPassengerSort from "../Models/IPassengerSort";
import Passenger from "../Models/Passenger";

const BackToFrontRow: IPassengerSort = (passengers: Passenger[]): Passenger[] => {
    return passengers.sort((a, b) => b.assignedSeat.row - a.assignedSeat.row)
};

export default BackToFrontRow;
