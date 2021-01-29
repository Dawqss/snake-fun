import { DrawElement, DrawFrame, KeyboardArrows } from "../types";
import { MatrixType, OffsetType } from "../gameCanvas/types";
import { Matrix } from "../matrix/Matrix";
import { Arena } from "../arena/Arena";

export class Snake extends DrawElement {
  lastMove = KeyboardArrows.ArrowDown;
  snakeOffsets: OffsetType[] = new Array(6)
    .fill(0)
    .map((_, i) => ({ x: 0, y: i }));
  snakeColorIndex = 3;

  constructor() {
    super();
    this.addControlHandlers();
  }

  addControlHandlers = () => {
    document.addEventListener("keydown", (event) => {
      this.lastMove = event.key as KeyboardArrows;
    });
  };

  recalculate = () => {
    const lengthOfSnake = this.snakeOffsets.length;
    const lastIndex = lengthOfSnake - 1;
    const lastElement = { ...this.snakeOffsets[lastIndex] };
    const lastIndexArenaX = Arena.width - 1;
    const lastIndexArenaY = Arena.height - 1;

    let newElement = { ...lastElement };

    if (this.lastMove === KeyboardArrows.ArrowDown) {
      const isBeyondBorder = lastElement.y >= lastIndexArenaY;
      newElement = {
        x: lastElement.x,
        y: isBeyondBorder ? 0 : lastElement.y + 1,
      };
    }
    if (this.lastMove === KeyboardArrows.ArrowLeft) {
      const isBeyondBorder = lastElement.x <= 0;
      newElement = {
        x: isBeyondBorder ? lastIndexArenaX : lastElement.x - 1,
        y: lastElement.y,
      };
    }
    if (this.lastMove === KeyboardArrows.ArrowRight) {
      const isBeyondBorder = lastElement.x >= lastIndexArenaX;
      newElement = {
        x: isBeyondBorder ? 0 : lastElement.x + 1,
        y: lastElement.y,
      };
    }

    if (this.lastMove === KeyboardArrows.ArrowUp) {
      const isBeyondBorder = lastElement.y <= 0;
      newElement = {
        x: lastElement.x,
        y: isBeyondBorder ? lastIndexArenaY : lastElement.y - 1,
      };
    }

    this.snakeOffsets.shift();
    this.snakeOffsets.push(newElement);
  };

  getMatrix = (): MatrixType => {
    const maxX = Math.max(...this.snakeOffsets.map((offset) => offset.x)) + 1;
    const maxY = Math.max(...this.snakeOffsets.map((offset) => offset.y)) + 1;
    const newMatrix = Matrix.createMatrix(maxX, maxY, 0);
    for (let snakeOffset of this.snakeOffsets) {
      const { x, y } = snakeOffset;
      newMatrix[y][x] = this.snakeColorIndex;
    }

    return newMatrix;
  };

  draw = (): DrawFrame => {
    return { matrix: this.getMatrix(), offset: { x: 0, y: 0 } };
  };
}
