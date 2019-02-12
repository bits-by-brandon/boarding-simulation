import PassengerFactory from "./Models/PassengerFactory";
import Plane from "./Models/Plane";
import TerminalRenderer from "./Views/TerminalRenderer";
import PassengerQueue from "./Models/PassengerQueue";
import StrategyHelper from "./Strategies/StrategyHelper";
import Config from './Config';
import QuickRender from "./Views/QuickRender";
import IRenderer from "./Views/IRenderer";
import ISimulationResults from "./Views/ISimulationResults";

const config = Config.getInstance();

async function runSimulation(): Promise<ISimulationResults> {
    // Create the queue
    const passengerQueue: PassengerQueue = new PassengerQueue();

    // Construct our plane
    const plane = new Plane(passengerQueue, config.rows, config.columnsPerSide, config.boardingGroups);

    // Prepare the passenger factory
    const passengerFactory: PassengerFactory = new PassengerFactory(plane);

    try {
        // Create passengers
        for (let i = 0; i < config.passengerCount; i++) {
            passengerQueue.add(passengerFactory.buildPassenger());
        }
    } catch (e) {
        console.error(e);
    }

    // Sort the passengers by the given strategy
    passengerQueue.sort(StrategyHelper.getStrategy(config.sortStrategyName));

    let renderer: IRenderer;

    if (config.animate) {
        renderer = new TerminalRenderer(plane);
    } else {
        renderer = new QuickRender(plane);
    }

    return renderer.execute();
}

const main = async () => {
    const simulations = [];

    for (let i = 0; i < config.simulationRuns; i++) {
        simulations.push(runSimulation())
    }

    const simResults: ISimulationResults[] = await Promise.all(simulations);

    const stepAverage: number = simResults.reduce((a, b) => a + b.totalSteps, 0) / simResults.length;

    const maxStows: number = simResults.reduce((a, b) => Math.max(a, b.concurrentStowMax), 0);

    if(!config.animate) {
        console.log(`sort used: ${config.sortStrategyName}`);
        console.log(`simulations ran: ${config.simulationRuns}`);
        console.log(`average steps: ${stepAverage}`);
        console.log(`maximum concurrent stows: ${maxStows}`);
        // console.log(`average execution time per simulation: ${executionTime / config.simulationRuns}`);
    }
};

main();

