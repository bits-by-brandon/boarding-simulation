"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const readline = require("readline");
const config = Config_1.default.getInstance();
class TerminalRenderer {
    execute() {
        const timeout = 1000 / config.fps;
        process.stdin.resume();
        return new Promise(resolve => {
            this._setInterval = setInterval(() => {
                this.update();
                if (this._isComplete) {
                    clearInterval(this._setInterval);
                    resolve(this._stepCount);
                }
                this.render();
            }, timeout);
        });
    }
    update() {
        this._plane.update();
    }
    render() {
        let frame = '';
        if (config.showRowNumbers) {
            frame += TerminalRenderer.renderRowNumbers(this._plane.rows);
        }
        for (let c = 0; c < this._plane.columns; c++) {
            if (c === this._plane.columns / 2) {
                frame += this.renderLane(this._plane.lane);
            }
            let column = '';
            if (config.showColumnNumbers) {
                column += String.fromCharCode(97 + c).toUpperCase() + ' ';
            }
            for (let r = 0; r < this._plane.rows; r++) {
                const seat = this._plane.getSeat(r, c);
                column += TerminalRenderer.renderSeat(seat);
            }
            frame += column + '\n';
        }
        frame += '\n';
        frame += this.renderStats();
        frame += this.renderQueue(this._plane.queue);
        if (this._plane.queue.length === 0 && this._plane.lane.occupied === 0) {
            frame += `\nFinished boarding in ${this._stepCount} steps`;
            this._isComplete = true;
        }
        else {
            this._stepCount++;
        }
        this.renderScreen(frame);
        return frame;
    }
    ;
    constructor(plane) {
        this._plane = plane;
        this._stepCount = 0;
        this._cursorPos = { x: 0, y: 0 };
        this._isComplete = false;
        this._setInterval = null;
        if (config.animate) {
            process.on('exit', () => {
                readline.moveCursor(process.stdout, 0, 0);
                readline.clearScreenDown(process.stdout);
            });
        }
        console.clear();
    }
    renderScreen(frame) {
        const lines = frame.split('\n');
        for (let i = 0; i < lines.length; i++) {
            readline.cursorTo(process.stdout, 0, i);
            process.stdout.write(lines[i]);
        }
        readline.clearScreenDown(process.stdout);
        readline.cursorTo(process.stdout, this._cursorPos.x, this._cursorPos.y);
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
        return output + '\n';
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
        return output + '\n';
    }
    renderQueue(queue) {
        let output = '\n';
        if (config.showColumnNumbers) {
            output += '   ';
        }
        output += `queue: ${queue.length}`;
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
        let output = '';
        if (config.showColumnNumbers) {
            output += '   ';
        }
        output += `steps: ${this._stepCount}`;
        output += `\t`;
        output += `x: ${this._cursorPos.x}, y: ${this._cursorPos.y}`;
        output += '\n';
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