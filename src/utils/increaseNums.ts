import { ICell } from '../types';
import { getNeighbors } from './getNeighbors';

export function increaseNums(matrix: ICell[][]) {
  matrix.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col.isBomb) {
        const neighbors = getNeighbors(rowIndex, colIndex, matrix);
        for (const neighbor of neighbors) {
          const [neighborRow, neighborCol] = neighbor;
          matrix[neighborRow][neighborCol].value += 1;
        }
      }
    });
  });
}
