"use client";

import { useState, useEffect } from "react";

const useScrollPosition = () => {
	const [scrollPosition, setScrollPosition] = useState(0);

	const handleScroll = () => {
		const position = window.scrollY;
		setScrollPosition(position);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return scrollPosition;
};

export default useScrollPosition;
