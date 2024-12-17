"use client";

import { usePathname } from "next/navigation";
import styles from "./BreadCrumb.module.scss";
import { useMemo } from "react";

export default function BreadCrumb() {
	const pathname = usePathname();
	const page = useMemo(() => {
		try {
			const path = pathname.split("/")[1].replace("-", " ");
			if (!path) return "";
			const words = path.split(" ");
			return words
				.map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
				.join(" ");
		} catch (error) {
			return "";
		}
	}, [pathname]);

	return (
		<>
			{page && (
				<div className={styles.breadcrumb}>
					<div className={styles.container}>
						<h3>{page === "Faq" ? "Q & A" : page}</h3>
					</div>
				</div>
			)}
		</>
	);
}
