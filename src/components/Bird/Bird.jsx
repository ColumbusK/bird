import React from "react";
import { useSelector } from "react-redux";

import "./Bird.css";

const Bird = () => {
  // 使用 useSelector 钩子来访问 Redux state
  const { y, r } = useSelector((state) => state.bird);

  return (
    <div
      className="Bird"
      style={{
        top: y,
        transform: `rotate(${r}deg)`,
        transition: "transform 200ms, top 200ms",
      }}
    ></div>
  );
};

export default Bird;
