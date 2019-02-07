import IPassengerSort from "../Models/IPassengerSort";
import Passenger from "../Models/Passenger";
import {shuffle} from "lodash";

const random: IPassengerSort = (passengers: Passenger[]): Passenger[] => {
    return shuffle(passengers);
};

export default random;
