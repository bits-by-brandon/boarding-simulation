interface IRenderer {
    render(): void;
    update(): void;
    execute(): Promise<number>;
}

export default IRenderer;