import React from "react";
import { useSelector } from "react-redux";

import "./Pipe.css";

const Pipe = () => {
  // 使用 useSelector 钩子来访问 Redux state
  const { x, pipes } = useSelector((state) => state.pipe);

  return (
    <div className="Pipe">
      {pipes.map(({ topHeight }, i) => (
        <div key={`pipe-${i}`} style={{ position: "relative" }}>
          <div
            className="Pipe-top"
            style={{
              left: x + i * 200,
              height: topHeight,
              transition: "left 200ms",
            }}
          ></div>
          <div
            className="Pipe-bottom"
            style={{
              left: x + i * 200,
              top: topHeight + 100,
              transition: "left 200ms",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Pipe;
