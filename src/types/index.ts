export interface ICell {
  row: number;
  col: number;
  isBomb: boolean;
  isFlipped: boolean;
  isFlagged: boolean;
  isWarned: boolean;
  value: number;
}
