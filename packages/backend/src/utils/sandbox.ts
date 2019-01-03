const { secondsToTime, timeToSeconds } = require('./hh-mm-ss');

let initialValue = 0;

const TRACKS = [
  { trackNumber: 1, duration: '3:41' },
  { trackNumber: 2, duration: '2:11' },
  { trackNumber: 3, duration: '3:01' },
  { trackNumber: 4, duration: '4:12' },
  { trackNumber: 5, duration: '3:21' },
];

const duration = TRACKS.reduce((accumulator, currentValue) =>
  accumulator + timeToSeconds(currentValue.duration) , initialValue
);

console.log({ duration }, secondsToTime(duration));
