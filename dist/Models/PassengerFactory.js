"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Passenger_1 = require("./Passenger");
class PassengerFactory {
    buildPassenger() {
        return new Passenger_1.default(this.idIndex++);
    }
    constructor() {
        this.idIndex = 0;
    }
}
exports.default = PassengerFactory;
//# sourceMappingURL=PassengerFactory.js.map