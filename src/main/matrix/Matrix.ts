import { MatrixType } from "../gameCanvas/types";

export class Matrix {
  static createMatrix(w: number, h: number, index: number): MatrixType {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(index));
    }
    return matrix;
  }
}
