import IPassengerSort from "../Models/IPassengerSort";
import Passenger from "../Models/Passenger";
import BackToFrontRow from "./backToFrontRow";
import WindowToIsle from "./WindowToIsle";
import BySide from "./BySide";
import alternatingRows from "./alternatingRows";

const fastest: IPassengerSort = (passengers: Passenger[]): Passenger[] => {
    return BySide(WindowToIsle(alternatingRows(BackToFrontRow(passengers))));
};

export default fastest;
