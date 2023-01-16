import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BOMBS_NUM, GameMode } from '../enum';
import { ICell } from '../types';
import { createBoard } from '../utils';
import { expand } from '../utils/expand';
import { flipFlaggedCell } from '../utils/flipFlaggedCell';
import { gameStatus } from '../utils/gameStatus';
import { warnFlagCell } from '../utils/warnFlagCell';

interface GameState {
  board: ICell[][];
  isGameOver: boolean;
  mode: GameMode;
  gameTime: number;
  isTimerRunning: boolean;
}

const initialState: GameState = {
  board: [],
  isGameOver: false,
  mode: GameMode.SHOVEL,
  gameTime: 0,
  isTimerRunning: false
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
      state.isTimerRunning = true;
    },
    handleCell: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      const { row, col } = action.payload;
      if (
        !state.board[row][col].isFlagged ||
        !state.board[row][col].isFlipped
      ) {
        // check can flip or not
        if (state.board[row][col].isBomb) {
          state.board[row][col].isFlipped = true;
          state.isGameOver = true;
          alert('💥');
        } else if (state.board[row][col].value === 0) {
          // expand
          state.board = expand(row, col, state.board);
        } else {
          // Flipped the cell
          state.board[row][col].isFlipped = true;
        }
      }
      // Check Game Status
      if (gameStatus(state.board, BOMBS_NUM, state.mode)) {
        alert('You found all the bombs!');
        state.isGameOver = true;
      }
    },
    flagCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const { row, col } = action.payload;

      if (state.board[row][col].isFlipped) {
        // Flip the cells by Flagged cells
        // Find the cells that need to be flipped
        const flipCell = flipFlaggedCell(row, col, state.board);
        // Loop those to flip
        for (const flip of flipCell) {
          const [flipRow, flipCol] = flip;
          state.board[flipRow][flipCol].isFlipped = true;
          // Check if it is a bomb
          if (state.board[flipRow][flipCol].isBomb) {
            state.isGameOver = true;
            alert('💥');
          }
        }
      } else {
        // Flag the cell
        state.board[row][col].isFlagged = !state.board[row][col].isFlagged;
        // Check the neighbors cell, need warning or not
        const [warnCell, cleanCell] = warnFlagCell(row, col, state.board);

        for (const warn of warnCell) {
          const [warnRow, warnCol] = warn;
          state.board[warnRow][warnCol].isWarned = true;
        }

        for (const clean of cleanCell) {
          const [cleanRow, cleanCol] = clean;
          state.board[cleanRow][cleanCol].isWarned = false;
        }
      }

      // Check Game Status
      if (gameStatus(state.board, BOMBS_NUM, state.mode)) {
        alert('You found all the bombs!');
        state.isGameOver = true;
      }
    },
    timeCounter: (state) => {
      // Count the time
      state.gameTime++;
    },
    isTimeRunning: (state, action: PayloadAction<boolean>) => {
      // Count the time
      state.isTimerRunning = action.payload;
    },
    changeGameMode: (state, action: PayloadAction<{ mode: GameMode }>) => {
      // Toggle flag -> shovel
      state.mode = action.payload.mode;
    },
    endGame: (state, action: PayloadAction<boolean>) => {
      state.isGameOver = action.payload;
      // state.gameTime = 0;
      state.isTimerRunning = false;
    }
  }
});

export const {
  initBoard,
  handleCell,
  flagCell,
  timeCounter,
  isTimeRunning,
  changeGameMode,
  endGame
} = GameStateSlice.actions;

export default GameStateSlice.reducer;
