import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Bird from "../Bird/Bird";
import Foreground from "../Foreground/Foreground";
import Pipe from "../Pipe/Pipe";
import { fly, fall, birdReset } from "../../store/birdSlice.js";
import { running, generate } from "../../store/pipeSlice.js";
import { gameStart, gameOver } from "../../store/gameSlice.js";
import "./Game.css";

let gameLoop;
let pipeGenerator;

const Game = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.game.status);
  console.log("game");

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 32) {
        dispatch(fly());
        console.log("fly");
      }
      console.log("status", status);

      if (status !== "playing") {
        console.log("playing check");
        dispatch(gameStart());
        start();
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      clearInterval(gameLoop);
      clearInterval(pipeGenerator);
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [dispatch, status]);

  useEffect(() => {
    if (status === "playing") {
      gameLoop = setInterval(() => {
        console.log("looping");
        dispatch(fall());
        dispatch(running());
        dispatch((dispatch, getState) => check(dispatch, getState));
      }, 200);

      pipeGenerator = setInterval(() => {
        dispatch(generate());
      }, 2000);

      dispatch(gameStart());
    } else {
      clearInterval(gameLoop);
      clearInterval(pipeGenerator);
    }

    return () => {
      clearInterval(gameLoop);
      clearInterval(pipeGenerator);
    };
  }, [status, dispatch]);

  const check = (dispatch, getState) => {
    const state = getState();
    const birdY = state.bird.y;
    const pipes = state.pipe.pipes;
    const x = state.pipe.x;
    const challenge = pipes
      .map(({ topHeight }, i) => ({
        x1: x + i * 200,
        y1: topHeight,
        x2: x + i * 200,
        y2: topHeight + 100,
      }))
      .filter(({ x1 }) => x1 > 0 && x1 < 288);

    if (birdY > 512 - 108) {
      dispatch(gameOver());
      dispatch(birdReset());
    }

    if (challenge.length) {
      const { x1, y1, x2, y2 } = challenge[0];
      if (
        (x1 < 120 && 120 < x1 + 52 && birdY < y1) ||
        (x2 < 120 && 120 < x2 + 52 && birdY > y2)
      ) {
        dispatch(gameOver());
        dispatch(birdReset());
      }
    }
  };

  return (
    <div className="Game">
      <Bird />
      <Pipe />
      <Foreground />
    </div>
  );
};

export default Game;

const start = () => {
  return (dispatch, getState) => {
    const { status } = getState().game;
    if (status !== "playing") {
      gameLoop = setInterval(() => {
        console.log("looping");

        dispatch(fall());
        dispatch(running());
        check(dispatch, getState);
      }, 200);

      pipeGenerator = setInterval(() => {
        dispatch(generate());
      }, 2000);

      dispatch(gameStart());
    }
  };
};
