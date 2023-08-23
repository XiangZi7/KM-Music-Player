export const formatTime = (songdt) => {
	let min = parseInt(songdt / 1000 / 60)
	let sec = parseInt((songdt / 1000) % 60)
	if (min < 10) {
		min = '0' + min
	}
	if (sec < 10) {
		sec = '0' + sec
	}
	return min + ":" + sec;
}

export function formatNumber(number) {
	if (number >= 10000 && number < 100000) {
		return (number / 10000).toFixed(0) + 'W';
	} else if (number >= 100000) {
		return (number / 10000).toFixed(0) + 'W';
	} else {
		return number.toString();
	}
}