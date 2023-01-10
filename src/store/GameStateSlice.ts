import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameMode } from '../enum';
import { ICell } from '../types';
import { createBoard } from '../utils';
import { expand } from '../utils/expand';

interface GameState {
  board: ICell[][];
  isGameOver: boolean;
  mode: GameMode;
  gameTime: number;
}

const initialState: GameState = {
  board: [],
  isGameOver: false,
  mode: GameMode.SHOVEL,
  gameTime: 0
};

const GameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    initBoard: (
      state,
      action: PayloadAction<{ width: number; height: number; bombs: number }>
    ) => {
      state.board = createBoard({
        width: action.payload.width,
        height: action.payload.height,
        bombs: action.payload.bombs
      });
      state.isGameOver = false;
      state.gameTime = 0;
    },
    handleCell: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      const { row, col } = action.payload;
      if (!state.board[row][col].isFlagged) {
        // check can flip or not
        if (state.board[row][col].isBomb) {
          state.board[row][col].isFlipped = true;
          state.isGameOver = true;
          alert('💥');
        } else if (state.board[row][col].value === 0) {
          // expand
          state.board = expand(row, col, state.board);
        } else {
          state.board[row][col].isFlipped = true;
        }
      }
    },
    flagCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
      state.board[action.payload.row][action.payload.col].isFlagged = true;
    },
    timeCounter: (state) => {
      state.gameTime++;
    },
    changeGameMode: (state, action: PayloadAction<{ mode: GameMode }>) => {
      state.mode = action.payload.mode;
    }
  }
});

export const { initBoard, handleCell, flagCell, timeCounter, changeGameMode } =
  GameStateSlice.actions;

export default GameStateSlice.reducer;
