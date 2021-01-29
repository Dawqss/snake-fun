import { MatrixType, OffsetType } from "./gameCanvas/types";

export type DrawFrame = { matrix: MatrixType; offset: OffsetType };
export type DrawFunction = () => DrawFrame;

export abstract class DrawElement {
  abstract draw(): DrawFrame;
  abstract recalculate(): void;
}

export enum KeyboardArrows {
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  ArrowUp = "ArrowUp",
}
