export interface ICell {
  row: number;
  col: number;
  isBomb: boolean;
  isFlipped: boolean;
  isFlagged: boolean;
  value: number;
}
