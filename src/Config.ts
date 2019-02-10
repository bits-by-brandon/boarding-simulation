import fs = require('fs');

class Config {
    private static instance: Config;

    readonly passengerCount: number;
    readonly rows: number;
    readonly columnsPerSide: number;
    readonly boardingGroups: number;
    readonly fps: number;
    readonly stepsPerBag: number;
    readonly bagMin: number;
    readonly bagMax: number;
    readonly seatShufflePenalty: number;
    readonly sortStrategyName: string;
    readonly showRowNumbers: boolean;
    readonly showColumnNumbers: boolean;
    readonly showBoardingGroups: boolean;
    readonly showLog: boolean;
    readonly animate: boolean;
    readonly simulationRuns: number;

    constructor(configPath: string) {
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

export default Config;