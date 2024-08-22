/* eslint-disable react/prop-types */
const ControlTimer = ({ time, setTime, min, max, type, interval }) => {
  return (
    <div className="control">
      <button
        id={`${type}-decrement`}
        className="control__btn btn-decrease"
        onClick={() => (time > min ? setTime(time - interval) : null)}
      ></button>
      <p id={`${type}-length`}>{time / interval}</p>
      <button
        id={`${type}-increment`}
        className="control__btn btn-increase"
        onClick={() => (time < max ? setTime(time + interval) : null)}
      ></button>
    </div>
  );
};

export default ControlTimer;
