import styles from "./Footer.module.scss";

export default function Footer() {
	return (
		<div className={styles.footer}>
			<div className={styles.logo_text}>Yoma & Robert</div>
			<div className={styles.date_text}>04.01.25</div>

			<footer className={styles.footer_credits}>
				<span>Designed with ❤️ by <a href="https://instagram.com/annie_shaka">Annie Shaka</a></span>
			</footer>
		</div>
	);
}
