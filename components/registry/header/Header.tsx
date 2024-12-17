import styles from "./Header.module.scss";

export default function TravelDetailsHeader() {
	return (
		<div className={styles.header}>
			<h3>Gifts Registry</h3>
			<p>
				So you don&apos;t have to struggle thinking of what to gift us your lovely
				couple, you can easily go through our carefully selected gift registry and
				pick one, or two, knowing whatever it is you send will be deeply
				appreciated and be a crucial part of our home building together. And if
				nothing on the list interests you, a cash gift would be just as special.
			</p>
		</div>
	);
}
