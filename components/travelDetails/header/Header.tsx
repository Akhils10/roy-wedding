import styles from "./Header.module.scss";

export default function TravelDetailsHeader() {
	return (
		<div className={styles.header}>
			<h3>Accommodation</h3>
			<p>
				We are so excited and grateful for those traveling to Benin to celebrate
				our wedding day. We have reserved a block of hotel rooms for guests in our
				bridal party in the hotels below. For out of town guests, tap any of the
				hotels listed to find more details on your accommodation options. Also
				find supermarkets listed for your last minute shopping essentials. You’re
				welcome :-)
			</p>
		</div>
	);
}
