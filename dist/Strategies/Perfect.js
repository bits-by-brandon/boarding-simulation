"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const backToFrontRow_1 = require("./backToFrontRow");
const WindowToIsle_1 = require("./WindowToIsle");
const BySide_1 = require("./BySide");
const fastest = (passengers) => {
    return BySide_1.default(WindowToIsle_1.default(backToFrontRow_1.default(passengers)));
};
exports.default = fastest;
//# sourceMappingURL=Perfect.js.map