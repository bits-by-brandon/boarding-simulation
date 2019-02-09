import IPassengerSort from "../Models/IPassengerSort";
import Passenger from "../Models/Passenger";
import BackToFrontRow from "./backToFrontRow";
import WindowToIsle from "./WindowToIsle";
import BySide from "./BySide";

const fastest: IPassengerSort = (passengers: Passenger[]): Passenger[] => {
    return BySide(WindowToIsle(BackToFrontRow(passengers)));
};

export default fastest;
