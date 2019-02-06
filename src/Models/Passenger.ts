import Plane from "./Plane";
import Seat from "./Seat";

class Passenger {
    get assignedSeat(): Seat {
        return this._assignedSeat;
    }

    set assignedSeat(value: Seat) {
        this._assignedSeat = value;
        if(this._assignedSeat.assignedPassenger !== this) {
            this._assignedSeat.assignedPassenger = this;
        }
    }

    private _assignedSeat: Seat;

    public _currentPosition: number|Seat|null;

    private _baggageCount: number;

    /**
     * @param assignedSeat
     * @param baggageCount
     * @param currentPosition
     */
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