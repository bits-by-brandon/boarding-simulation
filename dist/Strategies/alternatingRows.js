"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alternatingRows = (passengers) => {
    return passengers.sort((a, b) => (b.assignedSeat.row % 2 === 0 ? 0 : 1) - (a.assignedSeat.row % 2 === 0 ? 0 : 1));
};
exports.default = alternatingRows;
//# sourceMappingURL=alternatingRows.js.map