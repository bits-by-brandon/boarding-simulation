import IPassengerSort from "../Models/IPassengerSort";
import random from "./random";
import frontToBack from "./frontToBack";
import backToFront from "./backToFront";
import windowToIsle from "./windowToIsle";
import fastest from "./fastest";
import backToFrontRow from "./backToFrontRow";
import bySide from "./bySide";
import frontToBackRow from "./frontToBackRow";
import slowest from "./slowest";

abstract class StrategyHelper {
    static getStrategy(strategyName: string): IPassengerSort {
        switch (strategyName) {
            case 'backToFront':
                return backToFront;
            case 'frontToBack':
                return frontToBack;
            case 'windowToIsle':
                return windowToIsle;
            case 'backToFrontRow':
                return backToFrontRow;
            case 'frontToBackRow':
                return frontToBackRow;
            case 'fastest':
                return fastest;
            case 'slowest':
                return slowest;
            case 'bySide':
                return bySide;
            default:
                return random
        }
    }
}

export default StrategyHelper;