import { GameMode } from '../enum';
import { ICell } from '../types';

export function gameStatus(
  board: ICell[][],
  bombs: number,
  mode: GameMode
): boolean {
  let counter = 0;

  board.forEach((row) => {
    row.forEach((col) => {
      if (mode === GameMode.FLAG) {
        if (col.isFlagged) {
          counter++;
        }
      } else {
        if (!col.isFlipped) {
          counter++;
        }
      }
    });
  });

  if (counter === bombs) {
    return true;
  }
  return false;
}
