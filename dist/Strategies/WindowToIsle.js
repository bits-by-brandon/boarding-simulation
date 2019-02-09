"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WindowToIsle = (passengers) => {
    let colMax = 0;
    for (let c = 0; c < passengers.length; c++) {
        colMax = Math.max(passengers[c].assignedSeat.column, colMax);
    }
    const colMid = colMax / 2;
    return passengers.sort((a, b) => {
        return Math.abs(b.assignedSeat.column - colMid) - Math.abs(a.assignedSeat.column - colMid);
    });
};
exports.default = WindowToIsle;
//# sourceMappingURL=WindowToIsle.js.map