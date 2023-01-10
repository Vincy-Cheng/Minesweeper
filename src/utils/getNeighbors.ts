import { ICell } from '../types';

export function getNeighbors(row: number, col: number, matrix: ICell[][]) {
  const height = matrix.length;
  const width = matrix[row].length;
  const neighbors = [];

  if (row - 1 >= 0) neighbors.push([row - 1, col]); //UP
  if (row + 1 < height) neighbors.push([row + 1, col]); // DOWN
  if (col + 1 < width) neighbors.push([row, col + 1]); // RIGHT
  if (col - 1 >= 0) neighbors.push([row, col - 1]); //LEFT

  if (row - 1 >= 0 && col - 1 >= 0) neighbors.push([row - 1, col - 1]); //UP-LEFT
  if (row - 1 >= 0 && col + 1 < width) neighbors.push([row - 1, col + 1]); //UP-RIGHT
  if (row + 1 < height && col + 1 < width) neighbors.push([row + 1, col + 1]); //DOWN-LEFT
  if (row + 1 < height && col - 1 >= 0) neighbors.push([row + 1, col - 1]); //DOWN-RIGHT
  return neighbors;
}
