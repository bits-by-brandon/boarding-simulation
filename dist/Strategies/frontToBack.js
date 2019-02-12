"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frontToBack = (passengers) => {
    return passengers.sort((a, b) => a.assignedSeat.boardingGroup - b.assignedSeat.boardingGroup);
};
exports.default = frontToBack;
//# sourceMappingURL=frontToBack.js.map