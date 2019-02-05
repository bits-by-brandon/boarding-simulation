import Passenger from "./Models/Passenger";
import PassengerFactory from "./Models/PassengerFactory";
import Plane from "./Models/Plane";
import TerminalRenderer from "./Views/TerminalRenderer";

const passengerCount: number = parseInt(process.argv[2]) || 80;
const rows: number = parseInt(process.argv[3]) || 12;
const columnsPerRow: number = parseInt(process.argv[4]) || 3;
const boardingGroups: number = parseInt(process.argv[5]) || 3;

const passengerFactory = new PassengerFactory();

let passengerQueue: Passenger[] = [];

// Create passengers
for(let i = 0; i < passengerCount; i++) {
    passengerQueue.push(passengerFactory.buildPassenger());
}

const plane = new Plane(rows, columnsPerRow, boardingGroups);

const renderer = new TerminalRenderer(plane);

const output = renderer.render();

console.log(output);
