"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class Config {
    constructor(configPath = __dirname + '/../default.json') {
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
        this.bagMin = configJson['bagMin'];
        this.bagMax = configJson['bagMax'];
        this.seatShufflePenalty = configJson['seatShufflePenalty'];
        this.sortStrategyName = configJson['sortStrategyName'];
        this.showRowNumbers = configJson['showRowNumbers'];
        this.showColumnNumbers = configJson['showColumnNumbers'];
        this.showBoardingGroups = configJson['showBoardingGroups'];
        this.showLog = configJson['showLog'];
        this.animate = configJson['animate'];
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