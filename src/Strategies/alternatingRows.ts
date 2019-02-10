import IPassengerSort from "../Models/IPassengerSort";
import Passenger from "../Models/Passenger";

const alternatingRows: IPassengerSort = (passengers: Passenger[]): Passenger[] => {
    return passengers.sort((a, b) =>
        (b.assignedSeat.row % 2 === 0 ? 0 : 1) - (a.assignedSeat.row % 2 === 0 ? 0 : 1)
    );
};

export default alternatingRows;
