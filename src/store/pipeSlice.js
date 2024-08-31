// slices/pipeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  x: 300,
  pipes: [],
};

const pipeSlice = createSlice({
  name: "pipe",
  initialState,
  reducers: {
    running(state) {
      state.x -= 10;
    },
    generate(state) {
      const topHeight = Math.round(Math.random() * 200) + 50;
      state.pipes.push({ topHeight });
    },
    gameOver(state) {
      return initialState;
    },
  },
});

export const { running, generate, gameOver } = pipeSlice.actions;

export default pipeSlice.reducer;
