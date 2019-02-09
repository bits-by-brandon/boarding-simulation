"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BackToFrontRow = (passengers) => {
    return passengers.sort((a, b) => b.assignedSeat.row - a.assignedSeat.row);
};
exports.default = BackToFrontRow;
//# sourceMappingURL=backToFrontRow.js.map