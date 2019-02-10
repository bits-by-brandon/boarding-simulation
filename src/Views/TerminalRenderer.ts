import Plane from "../Models/Plane";
import Seat from "../Models/Seat";
import IRenderer from "./IRenderer";
import Lane from "../Models/Lane";
import PassengerQueue from "../Models/PassengerQueue";
import Config from "../Config";
import Passenger from "../Models/Passenger";
import readline = require("readline");
import Timeout = NodeJS.Timeout;

const config = Config.getInstance();

class TerminalRenderer implements IRenderer {

    private _plane: Plane;
    private _stepCount: number;
    private _cursorPos: { x: number, y: number };
    private _isComplete: boolean;
    private _setInterval: Timeout | null;

    async execute(): Promise<number> {
        const timeout = 1000 / config.fps;

        this._setInterval = setInterval(() => {
            this.update();

            if(this._isComplete) {
                clearInterval(this._setInterval);
                return this._stepCount;
            }

            this.render();
        }, timeout);

        // Keep node alive
        process.stdin.resume();

        return this._stepCount;
    }

    public update() {
        this._plane.update();
    }

    public render(): string {
        let frame = '';

        if (config.showRowNumbers) {
            frame += TerminalRenderer.renderRowNumbers(this._plane.rows);
        }

        // Render each line
        for (let c = 0; c < this._plane.columns; c++) {

            // Render the lane halfway through the columns
            if (c === this._plane.columns / 2) {
                frame += this.renderLane(this._plane.lane);
            }

            let column: string = '';

            if (config.showColumnNumbers) {
                column += String.fromCharCode(97 + c).toUpperCase() + ' '
            }

            // Render each row in the column
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
        } else {
            this._stepCount++;
        }

        this.renderScreen(frame);

        return frame;
    };

    constructor(plane: Plane) {
        this._plane = plane;
        this._stepCount = 0;
        this._cursorPos = {x: 0, y: 0};
        this._isComplete = false;
        this._setInterval = null;

        if(config.animate) {
            process.on('exit', () => {
                readline.moveCursor(process.stdout, 0, 0);
                readline.clearScreenDown(process.stdout);
            });
        }

        console.clear();
    }

    renderScreen(frame: string): void {
        const lines = frame.split('\n');
        for (let i = 0; i < lines.length; i++) {
            readline.cursorTo(process.stdout, 0, i);
            process.stdout.write(lines[i]);
        }

        readline.clearScreenDown(process.stdout);
        readline.cursorTo(process.stdout, this._cursorPos.x, this._cursorPos.y);
    }

    static renderSeat(seat: Seat): string {
        const token = seat.occupied !== null ? 'X' : ' ';
        return ' [' + token + ']';
    }

    static renderRowNumbers(rows: number): string {
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

    renderLane(lane: Lane): string {
        let output = ' ';

        if (config.showColumnNumbers) {
            output += '  ';
        }

        for (let r = 0; r < Object.keys(lane.rows).length; r++) {
            const passengerInRow = lane.getRow(r);
            if (passengerInRow !== null) {
                output += this.renderPassenger(passengerInRow);
            } else {
                output += '    ';
            }
        }

        return output + '\n';
    }

    renderQueue(queue: PassengerQueue): string {
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
        return output
    }

    renderStats(): string {
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

    renderPassenger(passenger: Passenger): string {
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


export default TerminalRenderer;