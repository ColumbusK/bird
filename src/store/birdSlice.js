import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  y: 250,
  r: 0,
};

const birdSlice = createSlice({
  name: "bird",
  initialState,
  reducers: {
    fly(state) {
      state.y -= 50;
      state.r = -20;
    },
    fall(state) {
      state.y += 30;
      state.r = 0;
    },
    birdReset(state) {
      // 这里我们可以直接返回 initialState 来重置状态
      return initialState;
    },
  },
});

export const { fly, fall, birdReset } = birdSlice.actions;

export default birdSlice.reducer;
