"use client";

import { useRouter } from "next/navigation";
import styles from "./Rsvp.module.scss";

export default function Rsvp() {
	const router = useRouter();
	return (
		<button className={styles.button}>
			<span className={styles.text} onClick={() => router.push("/rsvp")}>
				RSVP
			</span>
		</button>
	);
}
