import { DrawElement, DrawFrame } from "../types";
import { Matrix } from "../matrix/Matrix";

export class Arena extends DrawElement {
  static width = 40;
  static height = 40;
  offset = { x: 0, y: 0 };

  constructor() {
    super();
  }

  draw = (): DrawFrame => {
    return {
      matrix: Matrix.createMatrix(Arena.width, Arena.height, 8),
      offset: this.offset,
    };
  };

  recalculate = () => {};
}
