import { ICell } from '../types';

export function createCell(row: number, col: number): ICell {
  return {
    row,
    col,
    isBomb: false,
    isFlipped: false,
    isFlagged: false,
    value: 0
  };
}
