"use client";

import Image from "next/image";
import styles from "./Resources.module.scss";

export default function Resources() {
	const downloadProgram = async () => {
		try {
			const response = await fetch("/resources/invitation-card.jpg");
			const blob = await response.blob();
			const urlBlob = URL.createObjectURL(blob);

			const link = document.createElement("a");
			link.href = urlBlob;
			link.download = "ROY-Invitation.jpg";
			document.body.appendChild(link);
			link.click();

			document.body.removeChild(link);
			URL.revokeObjectURL(urlBlob);
		} catch (error) {
			console.error("Error downloading invite:", error);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>
					<h3>Wedding Invite</h3>
				</div>

				<div className={styles.content}>
					<div className={styles.item} onClick={downloadProgram}>
						<div className={styles.image}>
							<Image src="/resources/invitation-card.jpg" fill alt="" />
						</div>
						<span>Download Invite</span>
					</div>
				</div>
			</div>
		</>
	);
}
