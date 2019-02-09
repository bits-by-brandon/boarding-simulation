import IPassengerSort from "../Models/IPassengerSort";
import Passenger from "../Models/Passenger";

const BySide: IPassengerSort = (passengers: Passenger[]): Passenger[] => {
    // Unoptimized way to get the total columns of the plane
    let colMax = 0;

    for (let c = 0; c < passengers.length; c++) {
        colMax = Math.max(passengers[c].assignedSeat.column, colMax);
    }

    const colMid = colMax / 2;

    return passengers.sort((a, b) =>
        (a.assignedSeat.column < colMid ? 1 : 0) - (b.assignedSeat.column < colMid ? 1 : 0)
    );
};

export default BySide;
