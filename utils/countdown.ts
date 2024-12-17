export function countdownToEvent() {
	const now = new Date();
	const eventDate = new Date(2025, 0, 4, 11); // August is month 7 (0-based index)

	// If today's date is August 16th
	if (now.getMonth() === 0 && now.getDate() === 4) {
		const eventTime = new Date(now.getFullYear(), 0, 4, 11); // August 16th at 11am
		//@ts-ignore
		const timeDifference = eventTime - now;

		if (timeDifference > 0) {
			const hours = Math.floor(timeDifference / (1000 * 60 * 60));
			const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
			return hours > 0 ? `${hours} HOUR(S) TO GO!` : `${minutes} MINUTES TO GO!`;
		} else {
			return "";
		}
	} else {
		//@ts-ignore
		const timeDifference = eventDate - now;

		if (timeDifference > 0) {
			const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
			return `${days} DAYS TO GO!`;
		} else {
			return "";
		}
	}
}