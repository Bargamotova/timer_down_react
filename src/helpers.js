export default function prettyView(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return `${minutes < 10 ? "0" + minutes.toString() : minutes}:${seconds < 10 ? "0" + seconds.toString() : seconds
    }`;
}
