"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuickRender {
    async execute() {
        while (!this._isComplete) {
            this.update();
            this.render();
        }
        return this._stepCount;
    }
    update() {
        this._plane.update();
    }
    render() {
        if (this._plane.queue.length === 0 && this._plane.lane.occupied === 0) {
            this._isComplete = true;
        }
        else {
            this._stepCount++;
        }
    }
    ;
    constructor(plane, onComplete = null) {
        this._plane = plane;
        this._stepCount = 0;
        this._onComplete = onComplete;
    }
}
exports.default = QuickRender;
//# sourceMappingURL=QuickRender.js.map