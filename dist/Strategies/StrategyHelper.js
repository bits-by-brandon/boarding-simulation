"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("./random");
const frontToBack_1 = require("./frontToBack");
const backToFront_1 = require("./backToFront");
const windowToIsle_1 = require("./windowToIsle");
const perfect_1 = require("./perfect");
const backToFrontRow_1 = require("./backToFrontRow");
const bySide_1 = require("./bySide");
const frontToBackRow_1 = require("./frontToBackRow");
const slowest_1 = require("./slowest");
class StrategyHelper {
    static getStrategy(strategyName) {
        switch (strategyName) {
            case 'backToFront':
                return backToFront_1.default;
            case 'frontToBack':
                return frontToBack_1.default;
            case 'windowToIsle':
                return windowToIsle_1.default;
            case 'backToFrontRow':
                return backToFrontRow_1.default;
            case 'frontToBackRow':
                return frontToBackRow_1.default;
            case 'perfect':
                return perfect_1.default;
            case 'slowest':
                return slowest_1.default;
            case 'bySide':
                return bySide_1.default;
            default:
                return random_1.default;
        }
    }
}
exports.default = StrategyHelper;
//# sourceMappingURL=StrategyHelper.js.map