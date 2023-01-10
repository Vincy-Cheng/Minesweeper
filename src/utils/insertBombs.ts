import { ICell } from '../types';

export function insertBombs(matrix: ICell[][], bombs: number) {
  let bombsToInsert = bombs;
  while (bombsToInsert > 0) {
    let row = Math.floor(Math.random() * matrix.length);
    let col = Math.floor(Math.random() * matrix[row].length);

    if (!matrix[row][col].isBomb) {
      matrix[row][col].isBomb = true;
      bombsToInsert--;
    }
  }
}
