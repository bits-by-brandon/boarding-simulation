import fs = require('fs');

class Config {
    private static instance: Config;

    readonly passengerCount: number = 80;
    readonly rows: number = 12;
    readonly columnsPerSide: number = 3;
    readonly boardingGroups: number = 4;
    readonly fps: number = 10;
    readonly stepsPerBag: number = 5;
    readonly seatShufflePenalty: number = 5;
    readonly sortStrategyName: string = "backToFront";
    readonly showRowNumbers: boolean = true;
    readonly showColumnNumbers: boolean = true;
    readonly showBoardingGroups: boolean = true;
    readonly showLog: boolean = true;

    constructor(configPath: string = __dirname + '/../default.json') {
        const defaultConfigPath = __dirname + '/../default.json';

        let configJson;

        try {
            const configString = fs.readFileSync(configPath);
            configJson = JSON.parse(configString.toString());
        } catch (e) {
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

export default Config;