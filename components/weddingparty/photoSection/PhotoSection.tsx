import PhotoCard from "../photoCard/PhotoCard";
import styles from "./PhotoSection.module.scss";

export default function PhotoSection({
	photos,
	title,
}: {
	photos: { image: string; name: string }[];
	title: string;
}) {
	return (
		<div className={styles.section}>
			<div className={styles.title}>
				<h3>{title}</h3>
			</div>
			<div className={styles.content}>
				{photos.map((photo, index) => (
					<PhotoCard image={photo.image} name={photo.name} key={index} />
				))}
			</div>
		</div>
	);
}
