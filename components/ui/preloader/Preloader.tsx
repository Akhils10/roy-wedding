"use client";

import React, { useEffect } from "react";
import styles from "./Preloader.module.scss";
import { useGlobalContext } from "@/context/AppContext";

const Preloader = () => {
	const { isPageLoading, setIsPageLoading } = useGlobalContext();
	useEffect(() => {
		const load = setTimeout(() => setIsPageLoading(false), 1000);
		return () => {
			clearTimeout(load);
		};
	}, [isPageLoading]);
	return (
		<div className={styles.preloader} data-active={isPageLoading}>
			<div className={styles.loader}></div>
		</div>
	);
};

export default Preloader;
