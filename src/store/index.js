import { configureStore } from "@reduxjs/toolkit";
import birdReducer from "./birdSlice"; // 假设 birdSlice 文件直接在 store 文件夹下
import gameReducer from "./gameSlice";
import pipeReducer from "./pipeSlice";

const store = configureStore({
  reducer: {
    bird: birdReducer, // 如果有其他 reducer，可以在这里添加
    game: gameReducer,
    pipe: pipeReducer,
  },
});

export default store;
