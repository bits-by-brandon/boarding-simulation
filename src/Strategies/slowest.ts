import IPassengerSort from "../Models/IPassengerSort";
import Passenger from "../Models/Passenger";
import frontToBackRow from "./frontToBackRow";
import isleToWindow from "./isleToWindow";

const slowest: IPassengerSort = (passengers: Passenger[]): Passenger[] => {
    return frontToBackRow(isleToWindow(passengers));
};

export default slowest;
