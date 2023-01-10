import { ICell } from '../types';
import { getNeighbors } from './getNeighbors';

export function expand(row: number, col: number, board: ICell[][]) {
  const newBoard = board.slice();

  const stack = [[row, col]];

  while (stack.length > 0) {
    // find all connected 0 bombs value cell
    const [popRow, popCol] = stack.pop() as number[];
    const neighbors = getNeighbors(popRow, popCol, newBoard);
    // check neighbors
    for (const neighbor of neighbors) {
      const [neighborRow, neighborCol] = neighbor;
      if (newBoard[neighborRow][neighborCol].isFlipped) continue;
      if (newBoard[neighborRow][neighborCol].isFlagged) continue;
      if (!newBoard[neighborRow][neighborCol].isBomb) {
        newBoard[neighborRow][neighborCol].isFlipped = true;
        if (newBoard[neighborRow][neighborCol].value > 0) {
          continue;
        }
        stack.push(neighbor);
      }
    }
  }
  return newBoard;
}
