import { ICell } from '../types';

export function flaggedCell(board: ICell[][]): number {
  let count = 0;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col].isFlagged) count++;
    }
  }

  return count;
}
