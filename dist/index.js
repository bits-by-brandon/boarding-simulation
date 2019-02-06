"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassengerFactory_1 = require("./Models/PassengerFactory");
const Plane_1 = require("./Models/Plane");
const TerminalRenderer_1 = require("./Views/TerminalRenderer");
const passengerCount = parseInt(process.argv[2]) || 80;
const rows = parseInt(process.argv[3]) || 12;
const columnsPerRow = parseInt(process.argv[4]) || 3;
const boardingGroups = parseInt(process.argv[5]) || 3;
const fps = parseInt(process.argv[6]) || 1;
const plane = new Plane_1.default(rows, columnsPerRow, boardingGroups);
const passengerFactory = new PassengerFactory_1.default(plane.seats.slice());
const passengerQueue = [];
try {
    for (let i = 0; i < passengerCount; i++) {
        passengerQueue.push(passengerFactory.buildPassenger());
    }
}
catch (e) {
    console.error(e);
}
const renderer = new TerminalRenderer_1.default(plane);
setInterval(() => {
    renderer.render();
}, fps * 1000);
//# sourceMappingURL=index.js.map