import IRenderer from "./IRenderer";
import Plane from "../Models/Plane";

class QuickRender implements IRenderer {

    private _plane: Plane;
    private _stepCount: number;
    private _isComplete: boolean;
    private readonly _onComplete: (stepCount: number) => void;

    public async execute(): Promise<number> {
        while (!this._isComplete) {
            this.update();
            this.render();
        }

        return this._stepCount;
    }

    public update() {
        this._plane.update();
    }

    public render(): void {
        if (this._plane.queue.length === 0 && this._plane.lane.occupied === 0) {
            this._isComplete = true;
        } else {
            this._stepCount++;
        }
    };

    constructor(plane: Plane, onComplete: (stepCount: number) => void = null) {
        this._plane = plane;
        this._stepCount = 0;
        this._onComplete = onComplete;
    }
}

export default QuickRender;