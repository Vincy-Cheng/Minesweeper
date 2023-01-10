import { ICell } from '../types';

export function flipCell(row: number, col: number, board: ICell[][]) {
  const newBoard = board.slice();
  const cell = newBoard[row][col];
  const newCell = {
    ...cell,
    isFlipped: true
  };
  newBoard[row][col] = newCell;
  return newBoard;
}
