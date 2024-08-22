/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import prettyView from "./helpers";
import Display from "./components/Display";
import ControlTimer from "./components/ControlTimer";

import BeepSoundEffect from "./assets/BeepSoundEffect.mp3";

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60 * 60;
const interval = 60;

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);

  const [displayState, setDisplayState] = useState({
    time: sessionTime,
    timeType: "Session",
    timeRunning: false,
  });

  useEffect(() => {
    let timerId;
    if (!displayState.timeRunning) return;
    if (displayState.timeRunning) {
      timerId = window.setInterval(decrementTime, 1000);
    }
    return () => {
      window.clearInterval(timerId);
    };
  }, [displayState.timeRunning]);

  useEffect(() => {
    if (displayState.time < 0) {
      const audio = document.getElementById("beep");
      audio.play().catch((err) => console.log(err));
      setDisplayState((prev) => ({
        ...prev,
        time: prev.timeType === "Session" ? breakTime : sessionTime,
        timeType: prev.timeType === "Session" ? "Break" : "Session",
      }));
    }
  }, [displayState, breakTime, sessionTime]);

  const decrementTime = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }));
  };

  const changeBreakTime = (time) => {
    if (displayState.timeRunning) return;
    setBreakTime(time);
  };

  const changeSessionTime = (time) => {
    if (displayState.timeRunning) return;
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: "Session",
      timeRunning: false,
    });
  };

  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timeRunning: !prev.timeRunning,
    }));
  };
  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: sessionTime,
      timeType: "Session",
      timeRunning: false,
    });
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };
  return (
    <div className="container">
      <h1 className="title">25+5 Clock</h1>

      <div className="timer">
        <div className="break">
          <h3 id="break-label" className="subtitle">
            Break length
          </h3>
          <ControlTimer
            time={breakTime}
            setTime={changeBreakTime}
            min={min}
            max={max}
            interval={interval}
            type="break"
          />
        </div>
        <div className="session">
          <h3 id="session-label" className="subtitle">
            Session length
          </h3>
          <ControlTimer
            time={sessionTime}
            setTime={changeSessionTime}
            min={min}
            max={max}
            interval={interval}
            type="session"
          />
        </div>
        <Display displayState={displayState} />
      </div>
      <div className="control control-btns">
        <button
          id="start_stop"
          onClick={() => startStop()}
          className={`control__btn btn-${
            displayState.timeRunning ? "pause" : "play"
          }`}
        ></button>
        <button
          onClick={reset}
          id="reset"
          className="control__btn btn-reset"
        ></button>
      </div>
      <audio id="beep" src={BeepSoundEffect} />
    </div>
  );
}

export default App;
