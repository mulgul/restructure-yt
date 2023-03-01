export const formatDuration = (dur: number): string => {
	const minutes = Math.floor(dur / 60);
	const seconds = dur % 60;
	const formatedSeconds =
		seconds < 10 ? seconds.toString().padStart(2, '0') : seconds.toString();

	return minutes.toString() + ':' + formatedSeconds;
};
