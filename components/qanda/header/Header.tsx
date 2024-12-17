import styles from "./Header.module.scss";

export default function TravelDetailsHeader() {
	return (
		<div className={styles.header}>
			<h3>Question & Answers</h3>
			<p>
				We know you have questions, here are some possible answers to them and
				other important details to note
			</p>
		</div>
	);
}
