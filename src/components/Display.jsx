import prettyView from "../helpers";

/* eslint-disable react/prop-types */
const Display = ({ displayState }) => {
  return (
    <>
      <div className="display">
        <h3 id="timer-label" className="display__title">
          {displayState.timeType}
        </h3>
        <span
          id="time-left"
          className={`${
            displayState.timeRunning ? "accent" : ""
          } display__output`}
        >
          {prettyView(displayState.time)}
        </span>
      </div>
    </>
  );
};

export default Display;
