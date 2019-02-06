import Plane from "./Plane";
import Seat from "./Seat";

class Passenger {
    get currentPosition(): number|Seat|null {
        return this._currentPosition;
    }

    set currentPosition(value: number|Seat|null) {
        this._currentPosition = value;
    }

    protected _assignedSeat: Seat;

    private _currentPosition: number|Seat|null;

    private _baggageCount: number;

    constructor(assignedSeat: Seat, baggageCount: number = 1, currentPosition: number|Seat|null = null) {
        this._assignedSeat = assignedSeat;
        this._currentPosition = currentPosition;
        this._baggageCount = baggageCount;
    }

    step(plane: Plane) {
        if(this._assignedSeat === this._currentPosition) {
            return
        }

        // Check if in correct row
        // Check if any baggage needs to be stowed
    }
}

export default Passenger;