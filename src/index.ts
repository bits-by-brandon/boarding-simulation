import Passenger from "./Models/Passenger";
import PassengerFactory from "./Models/PassengerFactory";
import Plane from "./Models/Plane";
import TerminalRenderer from "./Views/TerminalRenderer";

const passengerCount: number = parseInt(process.argv[2]) || 80;
const rows: number = parseInt(process.argv[3]) || 12;
const columnsPerRow: number = parseInt(process.argv[4]) || 3;
const boardingGroups: number = parseInt(process.argv[5]) || 3;
const fps: number = parseInt(process.argv[6]) || 1;

// Construct our plane
const plane = new Plane(rows, columnsPerRow, boardingGroups);

// Prepare the passenger factory
const passengerFactory = new PassengerFactory(plane.seats.slice());

const passengerQueue: Passenger[] = [];

try {
// Create passengers
    for (let i = 0; i < passengerCount; i++) {
        passengerQueue.push(passengerFactory.buildPassenger());
    }
} catch (e) {
    console.error(e);
}

const renderer = new TerminalRenderer(plane);

// Render engine
setInterval(() => {
    renderer.render();
}, fps * 1000);

