import styles from "./Welcome.module.scss";
export default function Welcome() {
	return (
		<div className={styles.welcome}>
			<div className={styles.date_info}>
				<div className={styles.small_col}>
					<span>January 4th, <br /> 2025</span>
				</div>
				<div className={styles.seperator}></div>
				<div className={styles.small_col}>
					<span>Warri, <br /> Nigeria</span>
				</div>
			</div>

			{/* <div className={styles.welcome_note}>
				<p>Welcome family and friends!</p>
				<p>
					Planning our wedding ceremony has been an exciting labor of love and
					we hope to see you at our celebration. We created this page to give
					you a little window into our truly perfect love story, to share
					updates on our planning process and to answer any questions you may
					have as we get closer to our wedding day. So take this platform as a
					one stop shop we hope it provides you with all the little details you
					may need for our big day. We are excited to meet you all very soon on
					our special day!
				</p>
				<p className={styles.greetings}>
					Love, <br />
					Yoma & Robert
				</p>
			</div> */}
		</div>
	);
}
