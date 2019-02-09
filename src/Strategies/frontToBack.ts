import IPassengerSort from "../Models/IPassengerSort";
import Passenger from "../Models/Passenger";

const frontToBack: IPassengerSort = (passengers: Passenger[]): Passenger[] => {
    return passengers.sort((a, b) =>
        a.assignedSeat.boardingGroup - b.assignedSeat.boardingGroup
    );
};

export default frontToBack;
