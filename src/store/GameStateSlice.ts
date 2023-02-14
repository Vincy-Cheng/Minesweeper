import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameMode } from '../enum';
import { ICell } from '../types';
import { expand, flipFlaggedCell, gameStatus, warnFlagCell } from '../utils';

interface GameState {
  boardSize: { width: number; height: number };
  bombs: number;
  board: ICell[][];
  isGameOver: boolean;
  mode: GameMode;
  gameTime: number;
  isTimerRunning: boolean;
  statusMessage: string;
  scaleNumber: number;
  panNumber: { x: number; y: number };
  startTime: string;
}

const initialState: GameState = {
  boardSize: { width: 10, height: 10 },
  bombs: 10,
  board: [],
  isGameOver: false,
  mode: GameMode.SHOVEL,
  gameTime: 0,
  isTimerRunning: false,
  statusMessage: '',
  scaleNumber: 1,
  panNumber: { x: 0, y: 0 },
  startTime: ''
};

const GameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    initBoard: (
      state,
      action: PayloadAction<{
        width: number;
        height: number;
        bombs: number;
        board: ICell[][];
      }>
    ) => {
      state.board = action.payload.board;
      state.boardSize = {
        width: action.payload.width,
        height: action.payload.height
      };
      state.bombs = action.payload.bombs;
      state.isGameOver = false;
      state.gameTime = 0;
      state.isTimerRunning = true;
      state.statusMessage = '';
      state.startTime = new Date().toISOString();
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
          state.statusMessage = '💥';
        } else if (state.board[row][col].value === 0) {
          // expand
          state.board = expand(row, col, state.board);
        } else {
          // Flipped the cell
          state.board[row][col].isFlipped = true;
        }
      }
      // Check Game Status
      if (
        !state.isGameOver &&
        gameStatus(state.board, state.bombs, state.mode)
      ) {
        state.statusMessage = 'You found all the bombs!';
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
          if (state.board[flipRow][flipCol].value === 0) {
            state.board = expand(flipRow, flipCol, state.board);
          }
          // Check if it is a bomb
          if (state.board[flipRow][flipCol].isBomb) {
            state.isGameOver = true;
            state.statusMessage = '💥';
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
      if (gameStatus(state.board, state.bombs, state.mode)) {
        state.statusMessage = 'You found all the bombs!';
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
    },
    closeReminder: (state) => {
      state.statusMessage = '';
    },
    handlePan: (
      state,
      action: PayloadAction<{ scale: number; pan: { x: number; y: number } }>
    ) => {
      // console.log(action.payload, 'pan');
      state.scaleNumber = action.payload.scale;
      state.panNumber.x = action.payload.pan.x;
      state.panNumber.y = action.payload.pan.y;
    },

    handlePinch: (
      state,
      action: PayloadAction<{ scale: number; pan: { x: number; y: number } }>
    ) => {
      // console.log(action.payload, 'pan');
      state.scaleNumber = action.payload.scale;
      state.panNumber.x = action.payload.pan.x;
      state.panNumber.y = action.payload.pan.y;
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
  endGame,
  closeReminder,
  handlePan
} = GameStateSlice.actions;

export default GameStateSlice.reducer;
