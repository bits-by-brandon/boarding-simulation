import ISimulationResults from "./ISimulationResults";

interface IRenderer {
    render(): void;
    update(): void;
    execute(): Promise<ISimulationResults>;
}

export default IRenderer;