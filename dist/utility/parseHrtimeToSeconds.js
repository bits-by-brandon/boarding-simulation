"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseHrtimeToSeconds = (hrtime) => (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
exports.default = parseHrtimeToSeconds;
//# sourceMappingURL=parseHrtimeToSeconds.js.map