import Plane from "./Plane";
import Seat from "./Seat";
import Config from "../Config";

const config = Config.getInstance();

interface Task {
    time: number,
    title: string,
    callback: () => void;
}

class Passenger {
    private _plane: Plane;

    private _assignedSeat: Seat | null;

    private _currentPosition: number | Seat | null;

    private _baggageCount: number;

    private _status: string;

    private _taskQueue: Task[];

    get currentPosition(): number | Seat | null {
        return this._currentPosition;
    }

    set currentPosition(newPosition: number | Seat | null) {
        if (typeof this._currentPosition === "number") {
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

    get status(): string {
        return this._status;
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
        this._taskQueue = [];
    }

    init(): void {
        // Assign the seat to the passenger
        if (this._assignedSeat !== null) {
            this._assignedSeat.assignedPassenger = this;
        }
    }

    update() {
        // Perform any tasks that are in progress first
        if (this._taskQueue.length > 0) {
            this.performTask();
            return
        }

        // If no tasks are in process, assign new tasks to the queue
        this.queueTasks();

        // Begin performing any new tasks
        if (this._taskQueue.length > 0) {
            this.performTask();
            return
        }
    }

    queueTasks(): void {
        if (this._assignedSeat === this._currentPosition) {
            return
        }

        // If passenger is in the row of the assigned seat
        if (this.currentPosition === this._assignedSeat.row) {

            // Check if any baggage needs to be stowed
            if (this._baggageCount > 0) {
                this.queueStowBag();
                return
            }

            this.queueSit(this._assignedSeat);
            return
        }

        if (typeof this._currentPosition === 'number'
            && this._plane.getLaneRow(this._currentPosition + 1) === null) {
            this.queueMove();
            return
        }

        this._status = 'waiting';
    }

    performTask(): void {
        //TODO: implement logging utility
        const task = this._taskQueue[0];
        task.time--;
        this._status = task.title;
        if(task.time <= 0) {
            this._taskQueue.shift();
            task.callback();
        }
    }

    queueSit(targetSeat: Seat) {
        if (targetSeat.occupied !== null) {
            return false
        }

        const blockingSeats: Seat[] = this._plane.getSeatsInRow(targetSeat.row)
            // Filter by occupied seats
            .filter(seat => seat.occupied !== null)
            // Filter all seats between the row and the destination seat
            .filter(seat => {
                if(this._plane.getSeatSide(targetSeat) === 'left') {
                    return seat.column > this._assignedSeat.column && seat.column < (this._plane.columns / 2)
                } else {
                    return seat.column < this._assignedSeat.column && seat.column >= (this._plane.columns / 2)
                }
            });

        this._taskQueue.push({
            time: blockingSeats.length * config.seatShufflePenalty,
            title: 'shuffling',
            callback: () => {
                this.sit(this._assignedSeat);
            }
        });

    }

    sit(targetSeat: Seat): boolean {
        if (targetSeat.occupied !== null) {
            return false
        }

        // TODO: Create external "Join table" structure to hold Passenger + Seat relationship
        if (typeof this._currentPosition === "number") {
            this._plane.setLaneRow(this._currentPosition, null);
        }

        this._status = 'seated';
        targetSeat.occupied = this;
        this._currentPosition = targetSeat;
        return true;
    }

    queueStowBag(): void {
        this._taskQueue.push({
            time: config.stepsPerBag,
            title: 'stowing',
            callback: () => {
                this._baggageCount--;
            }
        });
    }

    queueMove(): void {
        if(typeof this._currentPosition === 'number'){
            const nextRow = this._currentPosition + 1;
            this._taskQueue.push({
                time: 1,
                title: 'moving',
                callback: () => this.move(nextRow)
            });
        }
    }

    move(nextRow: number): void {
        // TODO: Create external "Join table" structure to hold Passenger + Seat relationship

        // TODO: debugging utility
        // console.log(`passenger ${this._assignedSeat.seatLabel} is moving to ${nextRow}`);
        this._status = 'move';

        this._plane.setLaneRow(nextRow, this);
        this._currentPosition = nextRow;
    }
}

export default Passenger;