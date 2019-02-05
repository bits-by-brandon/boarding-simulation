import Plane from "../Models/Plane";

interface IRenderer {
    render(plane: Plane): string;
}

export default IRenderer;