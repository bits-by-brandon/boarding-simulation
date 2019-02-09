import IPassengerSort from "../Models/IPassengerSort";
import Passenger from "../Models/Passenger";

const backToFront: IPassengerSort = (passengers: Passenger[]): Passenger[] => {
    return passengers.sort((a, b) =>
        b.assignedSeat.boardingGroup - a.assignedSeat.boardingGroup
    );
};

export default backToFront;
