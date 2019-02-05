"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassengerFactory_1 = require("./Models/PassengerFactory");
const Plane_1 = require("./Models/Plane");
const TerminalRenderer_1 = require("./Views/TerminalRenderer");
const passengerCount = parseInt(process.argv[2]) || 80;
const rows = parseInt(process.argv[3]) || 12;
const columnsPerRow = parseInt(process.argv[4]) || 3;
const boardingGroups = parseInt(process.argv[5]) || 3;
const passengerFactory = new PassengerFactory_1.default();
let passengerQueue = [];
for (let i = 0; i < passengerCount; i++) {
    passengerQueue.push(passengerFactory.buildPassenger());
}
const plane = new Plane_1.default(rows, columnsPerRow, boardingGroups);
const renderer = new TerminalRenderer_1.default(plane);
const output = renderer.render();
console.log(output);
//# sourceMappingURL=index.js.map