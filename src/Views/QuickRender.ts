import IRenderer from "./IRenderer";
import Plane from "../Models/Plane";
import ISimulationResults from "./ISimulationResults";

class QuickRender implements IRenderer {

    private _plane: Plane;
    private _stepCount: number;
    private _isComplete: boolean;
    private readonly _onComplete: (stepCount: number) => void;
    private _concurrentStowMax: number;

    public async execute(): Promise<ISimulationResults> {
        while (!this._isComplete) {
            this.update();
            this.render();
        }

        return ({totalSteps: this._stepCount, concurrentStowMax: this._concurrentStowMax});
    }

    public update() {
        this._plane.update();
    }

    public render(): void {
        if (this._plane.queue.length === 0 && this._plane.lane.occupied.length === 0) {
            this._isComplete = true;
        } else {
            this._concurrentStowMax = Math.max(this._plane.lane.occupied.filter(p => p.status === 'stowing').length, this._concurrentStowMax);
            this._stepCount++;
        }
    };

    constructor(plane: Plane, onComplete: (stepCount: number) => void = null) {
        this._plane = plane;
        this._stepCount = 0;
        this._onComplete = onComplete;
        this._concurrentStowMax = 0;
    }
}

export default QuickRender;