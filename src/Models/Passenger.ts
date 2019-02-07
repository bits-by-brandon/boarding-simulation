import Plane from "./Plane";
import Seat from "./Seat";

class Passenger {

    private _plane: Plane;

    private _assignedSeat: Seat | null;

    private _currentPosition: number | Seat | null;

    private _baggageCount: number;

    get currentPosition(): number | Seat | null {
        return this._currentPosition;
    }

    set currentPosition(newPosition: number | Seat | null) {
        if(typeof this._currentPosition === "number") {
            this._plane.setLaneRow(this._currentPosition, null);
        }
        this._currentPosition = newPosition;
    }

    get baggageCount(): number {
        return this._baggageCount;
    }

    get assignedSeat(): Seat {
        return this._assignedSeat;
    }

    set assignedSeat(value: Seat) {
        // If the passenger had a previously assigned seat
        if (this._assignedSeat !== null) {
            // De-assign the previous seat
            this._assignedSeat.assignedPassenger = null;
        }

        this._assignedSeat = value;

        // Assign the seat this passenger
        if (this._assignedSeat.assignedPassenger !== this) {
            this._assignedSeat.assignedPassenger = this;
        }
    }

    /**
     * @param plane
     * @param assignedSeat
     * @param baggageCount
     * @param currentPosition
     */
    constructor(plane: Plane, assignedSeat: Seat | null = null, baggageCount: number = 1, currentPosition: number | Seat | null = null) {
        this._assignedSeat = assignedSeat;
        this._currentPosition = currentPosition;
        this._baggageCount = baggageCount;
        this._plane = plane;
    }

    init(): void {
        // Assign the seat to the passenger
        if (this._assignedSeat !== null) {
            this._assignedSeat.assignedPassenger = this;
        }
    }

    step() {
        if (this._assignedSeat === this._currentPosition) {
            return
        }

        if(this.currentPosition === this._assignedSeat.row) {

            // Check if any baggage needs to be stowed
            if(this._baggageCount > 0) {
                console.log(`passenger ${this._assignedSeat.seatLabel} is stowing`);
                // spend the step cycle stowing baggage
                this._baggageCount--;
                return
            }

            console.log(`passenger ${this._assignedSeat.seatLabel} is sitting`);

            this.sit(this._assignedSeat);
            return
        }


        if (typeof this._currentPosition === 'number'
            && this._plane.getLaneRow(this._currentPosition + 1) === null) {

            const nextRow = this._currentPosition + 1;
            // TODO: is this single responsibility? Who owns updating the position
            //  of the Passenger in the lane?

            console.log(`passenger ${this._assignedSeat.seatLabel} is moving to ${nextRow}`);

            this._plane.setLaneRow(nextRow, this);
            this._currentPosition = nextRow;

            return
        }

        console.log(`passenger ${this._assignedSeat.seatLabel} is waiting`);
    }

    sit(seat: Seat): boolean {
        if (seat.occupied !== null) {
            return false
        }

        // TODO: Who's responsibility to update the lane when a passenger sits?
        if(typeof this._currentPosition === "number") {
            this._plane.setLaneRow(this._currentPosition, null);
        }

        seat.occupied = this;
        this._currentPosition = seat;
        return true
    }

}

export default Passenger;