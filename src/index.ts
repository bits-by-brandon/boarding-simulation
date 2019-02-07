import PassengerFactory from "./Models/PassengerFactory";
import Plane from "./Models/Plane";
import TerminalRenderer from "./Views/TerminalRenderer";
import PassengerQueue from "./Models/PassengerQueue";
import StrategyHelper from "./Strategies/StrategyHelper";
import Config from './Config';

const config = Config.getInstance();

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

const renderer = new TerminalRenderer(plane);

// Render engine
setInterval(() => {
    renderer.update();
    renderer.render();
}, 1000 / config.fps);

