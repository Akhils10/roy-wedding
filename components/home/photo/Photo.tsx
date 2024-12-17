import styles from "./Photo.module.scss";
import Image from "next/image";

const Photo = () => {
	return (
		<div className={styles.hero}>
			<div className={styles.hero_container}>
				<Image src="/home/couple-home-2.jpg" fill alt=""/>
			</div>
		</div>
	);
};

export default Photo;
