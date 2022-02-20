import React from "react";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

let textColor = "#eabf9f";
const red = "#f54e4e";
const green = "#4aec8c";

function CircularProgress(props) {
  return (
    <CircularProgressbarWithChildren
      value={props.value}
      styles={{
        path: {
          stroke: props.mode === true ? green : red,
          strokeLinecap: "round",
          transition: "stroke-dashoffset 0.5s ease 0s",
          transform: "rotate(0.25turn)",
          transformOrigin: "center center",
        },
        trail: {
          stroke: "transparent",
          transform: "rotate(0.25turn)",
          transformOrigin: "center center",
        },
      }}
    >
      <div className="timer-message">
        {props.text} {props.button}
      </div>
    </CircularProgressbarWithChildren>
  );
}

export default CircularProgress;
