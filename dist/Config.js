"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class Config {
    constructor(configPath = __dirname + '/../default.json') {
        this.passengerCount = 80;
        this.rows = 12;
        this.columnsPerSide = 3;
        this.boardingGroups = 4;
        this.fps = 10;
        this.stepsPerBag = 5;
        this.seatShufflePenalty = 5;
        this.sortStrategyName = "backToFront";
        this.showRowNumbers = true;
        this.showColumnNumbers = true;
        this.showBoardingGroups = true;
        this.showLog = true;
        const defaultConfigPath = __dirname + '/../default.json';
        let configJson;
        try {
            const configString = fs.readFileSync(configPath);
            configJson = JSON.parse(configString.toString());
        }
        catch (e) {
            console.log('Could not provided config file. Using default');
            configJson = JSON.parse(defaultConfigPath);
        }
        this.passengerCount = configJson['passengerCount'];
        this.rows = configJson['rows'];
        this.columnsPerSide = configJson['columnsPerSide'];
        this.boardingGroups = configJson['boardingGroups'];
        this.fps = configJson['fps'];
        this.stepsPerBag = configJson['stepsPerBag'];
        this.seatShufflePenalty = configJson['seatShufflePenalty'];
        this.sortStrategyName = configJson['sortStrategyName'];
        this.showRowNumbers = configJson['showRowNumbers'];
        this.showColumnNumbers = configJson['showColumnNumbers'];
        this.showBoardingGroups = configJson['showBoardingGroups'];
        this.showLog = configJson['showLog'];
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