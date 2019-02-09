"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ByRow = (passengers) => {
    return passengers.sort((a, b) => b.assignedSeat.row - a.assignedSeat.row);
};
exports.default = ByRow;
//# sourceMappingURL=ByRow.js.map