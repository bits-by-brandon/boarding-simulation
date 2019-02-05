"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class renderTerminal {
    render(plane) {
        for (let r = 0; r < plane.rows; r++) {
            for (let c = 0; c < plane.columnsPerRow; c++) {
                console.log(renderTerminal.renderSeat(plane.getSeat(r, c)));
            }
        }
        return ' ';
    }
    ;
    static renderSeat(seat) {
        const token = typeof (seat.occupied !== null) ? 'X' : ' ';
        return '[' + token + ']';
    }
}
exports.default = renderTerminal;
//# sourceMappingURL=terminal.js.map