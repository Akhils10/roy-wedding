export const capitalize = (word: string) => {
	return word
		.split(" ")
		.map(a => `${a.charAt(0).toUpperCase()}${a.slice(1)}`)
		.join(" ");
};
