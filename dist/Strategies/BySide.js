"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BySide = (passengers) => {
    let colMax = 0;
    for (let c = 0; c < passengers.length; c++) {
        colMax = Math.max(passengers[c].assignedSeat.column, colMax);
    }
    const colMid = colMax / 2;
    return passengers.sort((a, b) => (a.assignedSeat.column < colMid ? 1 : 0) - (b.assignedSeat.column < colMid ? 1 : 0));
};
exports.default = BySide;
//# sourceMappingURL=BySide.js.map