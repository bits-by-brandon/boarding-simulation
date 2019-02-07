"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Random_1 = require("./Random");
const FrontToBack_1 = require("./FrontToBack");
const BackToFront_1 = require("./BackToFront");
class StrategyHelper {
    static getStrategy(strategyName) {
        switch (strategyName) {
            case 'backToFront':
                return BackToFront_1.default;
            case 'frontToBack':
                return FrontToBack_1.default;
            default:
                return Random_1.default;
        }
    }
}
exports.default = StrategyHelper;
//# sourceMappingURL=StrategyHelper.js.map