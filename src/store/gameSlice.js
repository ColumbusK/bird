// slices/gameSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "initial", // 初始状态
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    gameStart(state) {
      state.status = "playing";
    },
    gameOver(state) {
      state.status = "game-over";
    },
  },
});

export const { gameStart, gameOver } = gameSlice.actions;

export default gameSlice.reducer;
