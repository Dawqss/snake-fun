import { MatrixType, OffsetType } from "./types";
import { colors } from "../../const/colors";
import { DrawFunction } from "../types";

export class GameCanvas {
  readonly moveDeltaInMs = 600;

  dropCounter = 0;

  lastTime = 0;
  drawHandlers: DrawFunction[] = [];
  drawRecalcHandlers: (() => void)[] = [];

  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");

    this.context.scale(10, 10);
  }

  addDrawHandler = (handler: DrawFunction) => {
    this.drawHandlers.push(handler);
  };

  addRecalcDrawHandler = (handler: () => void) => {
    this.drawRecalcHandlers.push(handler);
  };

  resetBackground = () => {
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  update = (time = 0) => {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    this.dropCounter += deltaTime;

    if (this.dropCounter > this.moveDeltaInMs) {
      for (let drawRecalcHandler of this.drawRecalcHandlers) {
        drawRecalcHandler();
      }
      this.dropCounter = 0;
    }

    this.resetBackground();

    for (let handler of this.drawHandlers) {
      const { matrix, offset } = handler();
      if (!matrix || !offset) {
        return console.error("NO MATRIX PROVIDED");
      }
      this.drawMatrix(matrix, offset);
    }

    requestAnimationFrame(this.update);
  };

  drawMatrix = (matrix: MatrixType, offset: OffsetType = { x: 0, y: 0 }) => {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = colors[value];
          this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  };

  try = () => {
    const base_image = new Image();
    base_image.src =
      "https://www.osustuff.org/img/avatars/2017-12-18/375066.jpg";
    base_image.onload = () => {
      console.log("HEREEEE");
      console.log(base_image);
      this.context.drawImage(base_image, 0, 0, 1, 1);
    };
  };
}
