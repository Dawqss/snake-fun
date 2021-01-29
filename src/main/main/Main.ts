import { GameCanvas } from "../gameCanvas/GameCanvas";
import { DrawElement } from "../types";

export class Main {
  canvas: GameCanvas;
  gameElements: DrawElement[];

  constructor(canvas: GameCanvas, elements: DrawElement[]) {
    this.canvas = canvas;
    this.gameElements = elements;
  }

  bootstrap = (): void => {
    console.log("BOOTSTRAP");

    for (let element of this.gameElements) {
      this.canvas.addDrawHandler(element.draw);
      this.canvas.addRecalcDrawHandler(element.recalculate);
    }

    console.log("START UPDATE");
    this.canvas.update();
  };
}
