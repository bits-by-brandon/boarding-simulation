import Plane from "../Models/Plane";
import Seat from "../Models/Seat";
import IRenderer from "./renderer";
import Lane from "../Models/Lane";

class TerminalRenderer implements IRenderer {

    private _plane: Plane;

    constructor(plane: Plane) {
        this._plane = plane;
    }

    public render(): string {
        console.clear();

        let frameLines = [];

        //TODO: Replace with row guide bool
        if (true) {
            frameLines.push(TerminalRenderer.renderRowNumbers(this._plane.rows));
        }

        for (let c = 0; c < this._plane.columns; c++) {
            let column: string = '';

            // Render the lane halfway through the columns
            if (c === this._plane.columns / 2) {
                frameLines.push(TerminalRenderer.renderLane(this._plane.lane));
            }

            // Render each row in the column
            for (let r = 0; r < this._plane.rows; r++) {
                const seat = this._plane.getSeat(r, c);
                column += TerminalRenderer.renderSeat(seat);
            }
            frameLines.push(column);
        }

        const frame = frameLines.reduce((lines, line) => lines.concat(line + '\n'), '');
        console.log(frame);
        return frame;
    };

    static renderSeat(seat: Seat): string {
        const token = seat.occupied !== null ? 'X' : ' ';
        return ' [' + token + ']';
    }

    static renderRowNumbers(rows: number): string {
        let output = '';
        for (let r = 0; r < rows; r++) {
            if (r <= 10) {
                output += ' ';
            }
            output += ' ' + r + ' ';
        }
        return output;
    }

    static renderLane(lane: Lane) {
        let output = ' ';
        for (let r = 0; r < Object.keys(lane.rows).length; r++) {
            output += lane.getRow(r) !== null ? 'X' : ' ';
        }
        return output + '  '
    }
}


export default TerminalRenderer;