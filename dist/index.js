"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassengerFactory_1 = require("./Models/PassengerFactory");
const Plane_1 = require("./Models/Plane");
const TerminalRenderer_1 = require("./Views/TerminalRenderer");
const PassengerQueue_1 = require("./Models/PassengerQueue");
const StrategyHelper_1 = require("./Strategies/StrategyHelper");
const Config_1 = require("./Config");
const QuickRender_1 = require("./Views/QuickRender");
const config = Config_1.default.getInstance();
async function runSimulation() {
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
    let renderer;
    if (config.animate) {
        renderer = new TerminalRenderer_1.default(plane);
    }
    else {
        renderer = new QuickRender_1.default(plane);
    }
    return renderer.execute();
}
const main = async () => {
    const simulations = [];
    for (let i = 0; i < config.simulationRuns; i++) {
        simulations.push(runSimulation());
    }
    const simResults = await Promise.all(simulations);
    const stepAverage = simResults.reduce((a, b) => a + b.totalSteps, 0) / simResults.length;
    const maxStows = simResults.reduce((a, b) => Math.max(a, b.concurrentStowMax), 0);
    if (!config.animate) {
        console.log(`sort used: ${config.sortStrategyName}`);
        console.log(`simulations ran: ${config.simulationRuns}`);
        console.log(`average steps: ${stepAverage}`);
        console.log(`maximum concurrent stows: ${maxStows}`);
    }
};
main();
//# sourceMappingURL=index.js.map