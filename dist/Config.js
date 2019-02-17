"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Config {
    constructor(configPath) {
        const defaultConfigPath = path.resolve(__dirname, '../default.json');
        let configJson;
        try {
            const configString = fs.readFileSync(configPath);
            configJson = JSON.parse(configString.toString());
        }
        catch (e) {
            console.log('Could not provided config file. Using default');
            const configString = fs.readFileSync(defaultConfigPath);
            configJson = JSON.parse(configString.toString());
        }
        this.passengerCount = configJson['passengerCount'];
        this.rows = configJson['rows'];
        this.columnsPerSide = configJson['columnsPerSide'];
        this.boardingGroups = configJson['boardingGroups'];
        this.fps = configJson['fps'];
        this.stepsPerBag = configJson['stepsPerBag'];
        this.bagMin = configJson['bagMin'];
        this.bagMax = configJson['bagMax'];
        this.seatShufflePenalty = configJson['seatShufflePenalty'];
        this.sortStrategyName = configJson['sortStrategyName'];
        this.showRowNumbers = configJson['showRowNumbers'];
        this.showColumnNumbers = configJson['showColumnNumbers'];
        this.showBoardingGroups = configJson['showBoardingGroups'];
        this.showLog = configJson['showLog'];
        this.animate = typeof configJson['animate'] === 'boolean' ? configJson['animate'] : true;
        this.simulationRuns = this.animate ? 1 : configJson['simulationRuns'];
    }
    static getInstance() {
        if (!Config.instance) {
            Config.instance = new Config(process.argv[2]);
        }
        return Config.instance;
    }
}
exports.default = Config;
//# sourceMappingURL=Config.js.map