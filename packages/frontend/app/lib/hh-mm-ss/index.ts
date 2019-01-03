// tslint:disable:no-magic-numbers

/**
 * Convert seconds(Int) to time(String)
 * @param secs
 */
export const secondsToTime = (secs: number, showLeadingZero = false) => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor(secs % 3600 / 60);
  const seconds = Math.floor(secs % 3600 % 60);

	return (
    hours === 0 ? '' : hours > 0
    && hours.toString().length < 2 && showLeadingZero ? '0' + hours + ':' : hours + ':'
  )
  + ( minutes.toString().length < 2 && showLeadingZero ? '0' + minutes : minutes )
  + ':'
  + ( seconds.toString().length < 2 ? '0' + seconds : seconds );
};

/**
 * Convert time(String) to seconds(Int)
 * @param arg - time as a string
 */
export const timeToSeconds = (arg: string) => {
  const time = arg.split(':');
  const seconds = (parseInt(time[0], 10) * 60) + parseInt(time[1], 10);

  return seconds;
};
