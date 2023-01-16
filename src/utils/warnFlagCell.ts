import { ICell } from '../types';
import { getNeighbors } from './getNeighbors';

export function warnFlagCell(row: number, col: number, board: ICell[][]) {
  // Get the neighbor first
  const neighbors = getNeighbors(row, col, board);

  // Filter cells that already flipped

  const flippedCells = neighbors.filter((neighbor) => {
    const [neighborRow, neighborCol] = neighbor;
    return board[neighborRow][neighborCol].isFlipped === true;
  });

  const cleanCell: number[][] = [];

  // Only need to warn those flipped cell

  const warnCell = flippedCells.reduce((acc: number[][], index) => {
    const [rowIndex, colIndex] = index;

    // Find all the neighbors of flippedCell

    const outerNeighbors = getNeighbors(rowIndex, colIndex, board);
    // Count the flag
    let count = 0;
    for (const outer of outerNeighbors) {
      const [outerRow, outerCol] = outer;
      if (board[outerRow][outerCol].isFlagged) {
        count++;
      }
    }

    // Compare the flags
    // And separate it into 2 arrays
    if (count > board[rowIndex][colIndex].value) acc.push(index);
    else cleanCell.push(index);

    return acc;
  }, []);

  return [warnCell, cleanCell];
}
