"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const config = Config_1.default.getInstance();
class TerminalRenderer {
    update() {
        this._plane.update();
    }
    render() {
        console.clear();
        const frameLines = [];
        if (config.showRowNumbers) {
            frameLines.push(TerminalRenderer.renderRowNumbers(this._plane.rows));
        }
        for (let c = 0; c < this._plane.columns; c++) {
            if (c === this._plane.columns / 2) {
                frameLines.push(this.renderLane(this._plane.lane));
            }
            let column = '';
            if (config.showColumnNumbers) {
                column += String.fromCharCode(97 + c).toUpperCase() + ' ';
            }
            for (let r = 0; r < this._plane.rows; r++) {
                const seat = this._plane.getSeat(r, c);
                column += TerminalRenderer.renderSeat(seat);
            }
            frameLines.push(column);
        }
        frameLines.push(this.renderQueue(this._plane.queue));
        frameLines.push(this.renderStats());
        const frame = frameLines.reduce((lines, line) => lines.concat(line + '\n'), '');
        console.log(frame);
        if (this._plane.queue.length === 0 && this._plane.lane.occupied === 0) {
            console.log(`Finished boarding in ${this._stepCount} steps!`);
        }
        else {
            this._stepCount++;
        }
        return frame;
    }
    ;
    constructor(plane) {
        this._plane = plane;
        this._stepCount = 0;
    }
    static renderSeat(seat) {
        const token = seat.occupied !== null ? 'X' : ' ';
        return ' [' + token + ']';
    }
    static renderRowNumbers(rows) {
        let output = '';
        if (config.showColumnNumbers) {
            output += '  ';
        }
        for (let r = 0; r < rows; r++) {
            if (r < 10) {
                output += ' ';
            }
            output += ' ' + (r + 1) + ' ';
        }
        return output;
    }
    renderLane(lane) {
        let output = ' ';
        if (config.showColumnNumbers) {
            output += '  ';
        }
        for (let r = 0; r < Object.keys(lane.rows).length; r++) {
            const passengerInRow = lane.getRow(r);
            if (passengerInRow !== null) {
                output += this.renderPassenger(passengerInRow);
            }
            else {
                output += '    ';
            }
        }
        return output;
    }
    renderQueue(queue) {
        let output = '\n';
        if (config.showColumnNumbers) {
            output += '   ';
        }
        output += `Queue: ${queue.length}`;
        for (let r = 0; r < queue.length; r++) {
            if (r % (this._plane.rows * 2) === 0) {
                output += '\n';
                if (config.showColumnNumbers) {
                    output += '  ';
                }
            }
            output += ' O';
        }
        return output;
    }
    renderStats() {
        let output = '\n';
        if (config.showColumnNumbers) {
            output += '   ';
        }
        output += `steps: ${this._stepCount}`;
        return output;
    }
    renderPassenger(passenger) {
        const direction = this._plane.getSeatSide(passenger.assignedSeat) === 'left' ? '↑' : '↓';
        switch (passenger.status) {
            case 'stowing':
                return ' ' + passenger.baggageCount.toString() + direction + ' ';
            case 'shuffling':
                return ` X${direction} `;
            case 'moving':
            case 'waiting':
            case 'sitting':
            default:
                return ' ' + passenger.baggageCount.toString() + '  ';
        }
    }
}
exports.default = TerminalRenderer;
//# sourceMappingURL=TerminalRenderer.js.map