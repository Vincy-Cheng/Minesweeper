import { ICell } from '../types';
import { getNeighbors } from './getNeighbors';

export function increaseNums(matrix: ICell[][]) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col].isBomb) {
        const neighbors = getNeighbors(row, col, matrix);
        for (const neighbor of neighbors) {
          const [neighborRow, neighborCol] = neighbor;
          matrix[neighborRow][neighborCol].value += 1;
        }
      }
    }
  }
}
