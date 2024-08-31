import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import rootReducer from "./reducers";
//
import Game from "./components/Game/Game";

function App() {
  return (
    <>
      <div>
        <Game />
      </div>
    </>
  );
}

export default App;
