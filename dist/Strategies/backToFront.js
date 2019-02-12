"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const backToFront = (passengers) => {
    return passengers.sort((a, b) => b.assignedSeat.boardingGroup - a.assignedSeat.boardingGroup);
};
exports.default = backToFront;
//# sourceMappingURL=backToFront.js.map