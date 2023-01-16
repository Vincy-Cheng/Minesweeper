import { ICell } from '../types';
import { getNeighbors } from './getNeighbors';

export function flipFlaggedCell(row: number, col: number, board: ICell[][]) {
  const neighbors = getNeighbors(row, col, board);
  // Check how many flags near to that cell
  let flags = 0;

  // Filter the neighbor cells that need to be flipped
  // AND count how many neighbor cell is flagged
  const flipCell = neighbors.filter((neighbor) => {
    const [neighborRow, neighborCol] = neighbor;
    if (board[neighborRow][neighborCol].isFlagged) flags++;

    return !board[neighborRow][neighborCol].isFlagged;
  });
  // Return the cells that needed to be flipped ONLY IF value = actual flagged cells
  if (flags === board[row][col].value) {
    return flipCell;
  }
  return [];
}
