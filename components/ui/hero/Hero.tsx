import styles from "./Hero.module.scss";
import Image from "next/image";

const Hero = ({ heroImage }: { heroImage?: string }) => {
	return (
		<div className={styles.hero}>
			<div className={styles.hero_container}>
				<Image src={heroImage || "/home/couple-home.jpg"} fill alt="" />
			</div>
		</div>
	);
};

export default Hero;
