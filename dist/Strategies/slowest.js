"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frontToBackRow_1 = require("./frontToBackRow");
const isleToWindow_1 = require("./isleToWindow");
const slowest = (passengers) => {
    return frontToBackRow_1.default(isleToWindow_1.default(passengers));
};
exports.default = slowest;
//# sourceMappingURL=slowest.js.map