"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassengerFactory_1 = require("./Models/PassengerFactory");
const Plane_1 = require("./Models/Plane");
const TerminalRenderer_1 = require("./Views/TerminalRenderer");
const PassengerQueue_1 = require("./Models/PassengerQueue");
const StrategyHelper_1 = require("./Strategies/StrategyHelper");
const Config_1 = require("./Config");
const config = Config_1.default.getInstance();
const passengerQueue = new PassengerQueue_1.default();
const plane = new Plane_1.default(passengerQueue, config.rows, config.columnsPerSide, config.boardingGroups);
const passengerFactory = new PassengerFactory_1.default(plane);
try {
    for (let i = 0; i < config.passengerCount; i++) {
        passengerQueue.add(passengerFactory.buildPassenger());
    }
}
catch (e) {
    console.error(e);
}
passengerQueue.sort(StrategyHelper_1.default.getStrategy(config.sortStrategyName));
const renderer = new TerminalRenderer_1.default(plane);
setInterval(() => {
    renderer.update();
    renderer.render();
}, 1000 / config.fps);
//# sourceMappingURL=index.js.map