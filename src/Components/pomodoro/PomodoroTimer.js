import React, { useState, useEffect } from "react";
import CircularProgress from "./CircularProgress";

function Pomodoro() {
  const [paused, setPaused] = useState(false);
  const [work, setWork] = useState(true); //either work or break
  const [secondsLeft, setSecondsLeft] = useState(59);
  const [minutesLeft, setMinutesLeft] = useState(24);
  const [message, setMessage] = useState("");
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);

      if (paused === true) {
      } else {
        if (secondsLeft === 0) {
          if (minutesLeft !== 0) {
            setSecondsLeft(59);
            setMinutesLeft((minutesLeft) => minutesLeft - 1);
          } else {
            let minutes = work ? 24 : 4;
            let seconds = 59;

            setMinutesLeft(minutes);
            setSecondsLeft(seconds);
            setWork(!work);
          }
        } else {
          setSecondsLeft(secondsLeft - 1);
        }
      }
    }, 1000);
  }, [secondsLeft, paused, work, minutesLeft]);

  useEffect(() => {
    if (work !== true) {
      setPomodorosCompleted(pomodorosCompleted + 1);
    } else {
      setPomodorosCompleted(pomodorosCompleted);
    }
  }, [work]);

  useEffect(() => {
    document.title = `${timerMinutes}:${timerSeconds}`;
  }, [minutesLeft, secondsLeft]);

  const Message = () => {
    if (work === true) {
      setMessage("It's time to work!");
    } else {
      setMessage("It's time to take a break!");
    }
    return <div className="message">{message}</div>;
  };

  // set so single digit time displayas 01 not 1
  const timerMinutes = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
  const timerSeconds = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

  // calculate percentage of time left
  const totalSecondsLeft = minutesLeft * 60 + secondsLeft;
  const totalSeconds = work === true ? 25 * 60 : 5 * 60;
  const percentage = Math.round((totalSecondsLeft / totalSeconds) * 100);

  return (
    <div className="pomodoro">
      <div className="timer">
        <CircularProgress
          value={percentage}
          text={timerMinutes + ":" + timerSeconds}
          mode={work}
          button={
            <button
              className="button center"
              onClick={(e) => {
                e.target.classList.toggle("pause");
                setPaused(!paused);
              }}
            ></button>
          }
        />
      </div>
      <Message />
      <div className="message">
        Number of Pomodoro Sessions Completed: {pomodorosCompleted}
      </div>
    </div>
  );
}

export default Pomodoro;
