import Plane from "./Plane";
import Seat from "./Seat";

class Passenger {

    get currentPosition(): number | Seat | null {
        return this._currentPosition;
    }

    get baggageCount(): number {
        return this._baggageCount;
    }

    get assignedSeat(): Seat {
        return this._assignedSeat;
    }

    set assignedSeat(value: Seat) {
        // If the passenger had a previously assigned seat
        if(this._assignedSeat !== null) {
            // De-assign the previous seat
            this._assignedSeat.assignedPassenger = null;
        }

        this._assignedSeat = value;

        // Assign the seat this passenger
        if(this._assignedSeat.assignedPassenger !== this) {
            this._assignedSeat.assignedPassenger = this;
        }
    }

    private _assignedSeat: Seat;

    private _currentPosition: number|Seat|null;

    private readonly _baggageCount: number;

    sit(seat: Seat): boolean {
        if (seat.occupied !== null) {
            return false
        }

        seat.occupied = this;
        this._currentPosition = seat;
        return true
    }

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

    init(): void {
        // Assign the seat to the passenger
        this._assignedSeat.assignedPassenger = this;
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