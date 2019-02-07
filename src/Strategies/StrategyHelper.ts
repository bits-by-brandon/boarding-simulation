import IPassengerSort from "../Models/IPassengerSort";
import random from "./Random";
import frontToBack from "./FrontToBack";
import backToFront from "./BackToFront";

abstract class StrategyHelper {
    static getStrategy(strategyName: string): IPassengerSort {
        switch (strategyName) {
            case 'backToFront':
                return backToFront;
            case 'frontToBack':
                return frontToBack;
            default:
                return random
        }
    }
}

export default StrategyHelper;