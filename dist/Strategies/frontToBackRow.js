"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frontToBackRow = (passengers) => {
    return passengers.sort((a, b) => a.assignedSeat.row - b.assignedSeat.row);
};
exports.default = frontToBackRow;
//# sourceMappingURL=frontToBackRow.js.map