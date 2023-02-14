import { ICell } from '../types';
import { createCell } from './createCell';
import { increaseNums } from './increaseNums';
import { insertBombs } from './insertBombs';

type CreateBoard = {
  width: number;
  height: number;
  bombs: number;
};

export function createBoard({ width, height, bombs }: CreateBoard) {
  const matrix: ICell[][] = [];

  // create an empty bombs array first

  for (let row = 0; row < height; row++) {
    const newRow = [];

    for (let col = 0; col < width; col++) {
      newRow.push(createCell(row, col));
    }
    matrix.push(newRow);
  }

  //  Array share address
  // insert bombs
  insertBombs(matrix, bombs);
  // increase numbers
  increaseNums(matrix);

  return matrix;
}
