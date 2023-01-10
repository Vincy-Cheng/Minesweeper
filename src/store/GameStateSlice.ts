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
      if (state.board[action.payload.row][action.payload.col].isBomb) {
        // state.board
        // flip all
        // Or alert
        // Go Back
        state.isGameOver = true;
        alert('💥');
      } else if (
        state.board[action.payload.row][action.payload.col].value === 0
      ) {
        // expand
        state.board = expand(
          action.payload.row,
          action.payload.col,
          state.board
        );
      } else {
        // flip cell
      }
      state.board[action.payload.row][action.payload.col].isFlipped = true;
    },
    timeCounter: (state) => {
      state.gameTime++;
    }
  }
});

export const { initBoard, handleCell, timeCounter } = GameStateSlice.actions;

export default GameStateSlice.reducer;
