import IPassengerSort from "../Models/IPassengerSort";
import Passenger from "../Models/Passenger";

const isleToWindow: IPassengerSort = (passengers: Passenger[]): Passenger[] => {
    // Unoptimized way to get the total columns of the plane
    let colMax = 0;

    for(let c = 0; c < passengers.length; c++){
        colMax = Math.max(passengers[c].assignedSeat.column, colMax);
    }

    const colMid = colMax / 2;

    return passengers.sort((a, b) => {
        return Math.abs(a.assignedSeat.column - colMid ) - Math.abs(b.assignedSeat.column - colMid);
    })
};

export default isleToWindow;
