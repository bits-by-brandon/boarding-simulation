"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuickRender {
    async execute() {
        while (!this._isComplete) {
            this.update();
            this.render();
        }
        return ({ totalSteps: this._stepCount, concurrentStowMax: this._concurrentStowMax });
    }
    update() {
        this._plane.update();
    }
    render() {
        if (this._plane.queue.length === 0 && this._plane.lane.occupied.length === 0) {
            this._isComplete = true;
        }
        else {
            this._concurrentStowMax = Math.max(this._plane.lane.occupied.filter(p => p.status === 'stowing').length, this._concurrentStowMax);
            this._stepCount++;
        }
    }
    ;
    constructor(plane, onComplete = null) {
        this._plane = plane;
        this._stepCount = 0;
        this._onComplete = onComplete;
        this._concurrentStowMax = 0;
    }
}
exports.default = QuickRender;
//# sourceMappingURL=QuickRender.js.map