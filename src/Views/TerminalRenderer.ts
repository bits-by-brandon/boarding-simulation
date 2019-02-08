import Plane from "../Models/Plane";
import Seat from "../Models/Seat";
import IRenderer from "./IRenderer";
import Lane from "../Models/Lane";
import PassengerQueue from "../Models/PassengerQueue";
import Config from "../Config";
import Passenger from "../Models/Passenger";

const config = Config.getInstance();

class TerminalRenderer implements IRenderer {

    private _plane: Plane;
    private _stepCount: number;

    public update() {
        this._plane.update();
    }

    public render(): string {
        // TODO: Refactor to use repl module
        console.clear();

        const frameLines = [];

        if (config.showRowNumbers) {
            frameLines.push(TerminalRenderer.renderRowNumbers(this._plane.rows));
        }

        // Render each line
        for (let c = 0; c < this._plane.columns; c++) {

            // Render the lane halfway through the columns
            if (c === this._plane.columns / 2) {
                frameLines.push(this.renderLane(this._plane.lane));
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
            frameLines.push(column);
        }

        frameLines.push(this.renderQueue(this._plane.queue));

        frameLines.push(this.renderStats());

        const frame = frameLines.reduce((lines, line) => lines.concat(line + '\n'), '');

        console.log(frame);

        if (this._plane.queue.length === 0 && this._plane.lane.occupied === 0) {
            console.log(`Finished boarding in ${this._stepCount} steps!`);
        } else {
            this._stepCount++;
        }

        return frame;
    };

    constructor(plane: Plane) {
        this._plane = plane;
        this._stepCount = 0;
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
        return output;
    }

    renderLane(lane: Lane): string {
        let output = ' ';

        if (config.showColumnNumbers) {
            output += '  ';
        }

        for (let r = 0; r < Object.keys(lane.rows).length; r++) {
            const passengerInRow = lane.getRow(r);
            if(passengerInRow !== null) {
                output += this.renderPassenger(passengerInRow);
            } else {
                output += '    ';
            }
        }

        return output
    }

    renderQueue(queue: PassengerQueue): string {
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
        return output
    }

    renderStats(): string {
        let output = '\n';
        if (config.showColumnNumbers) {
            output += '   ';
        }
        output += `steps: ${this._stepCount}`;
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