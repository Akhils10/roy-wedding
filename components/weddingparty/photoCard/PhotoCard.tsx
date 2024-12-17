import Image from "next/image";
import styles from "./PhotoCard.module.scss";

export default function PhotoCard({ image, name }: { image: string; name: string }) {
	return (
		<div className={styles.container}>
			<div className={styles.image}>
				<Image src={image} fill alt="" />
			</div>

			<span>{name}</span>
		</div>
	);
}
