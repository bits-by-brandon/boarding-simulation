"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TerminalRenderer {
    update() {
        this._plane.update();
    }
    render() {
        console.clear();
        let frameLines = [];
        if (true) {
            frameLines.push(TerminalRenderer.renderRowNumbers(this._plane.rows));
        }
        for (let c = 0; c < this._plane.columns; c++) {
            let column = '';
            if (c === this._plane.columns / 2) {
                frameLines.push(TerminalRenderer.renderLane(this._plane.lane));
            }
            for (let r = 0; r < this._plane.rows; r++) {
                const seat = this._plane.getSeat(r, c);
                column += TerminalRenderer.renderSeat(seat);
            }
            frameLines.push(column);
        }
        frameLines.push(TerminalRenderer.renderQueue(this._plane.queue));
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
        for (let r = 0; r < rows; r++) {
            if (r <= 10) {
                output += ' ';
            }
            output += ' ' + r + ' ';
        }
        return output;
    }
    static renderLane(lane) {
        let output = ' ';
        for (let r = 0; r < Object.keys(lane.rows).length; r++) {
            output += lane.getRow(r) !== null ? ' X  ' : '    ';
        }
        return output + '  ';
    }
    static renderQueue(queue) {
        let output = '\n';
        for (let r = 0; r < queue.length; r++) {
            output += ' X';
        }
        return output;
    }
    renderStats() {
        return `steps: ${this._stepCount}\t queue:${this._plane.queue.length}`;
    }
}
exports.default = TerminalRenderer;
//# sourceMappingURL=TerminalRenderer.js.map