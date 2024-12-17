import Image from "next/image";
import styles from "./Leaves.module.scss";

export default function Leaves() {
	return (
		<div className={styles.leaves}>
			<div className={styles.leaf}>
				<Image src="/leaves/1.svg" fill alt="" />
			</div>
			<div className={styles.leaf}>
				<Image src="/leaves/2.svg" fill alt="" />
			</div>
			<div className={styles.leaf}>
				<Image src="/leaves/3.svg" fill alt="" />
			</div>
			<div className={styles.leaf}>
				<Image src="/leaves/4.svg" fill alt="" />
			</div>
			<div className={styles.leaf}>
				<Image src="/leaves/5.svg" fill alt="" />
			</div>
			<div className={styles.leaf}>
				<Image src="/leaves/6.svg" fill alt="" />
			</div>
			<div className={styles.leaf}>
				<Image src="/leaves/7.svg" fill alt="" />
			</div>
			<div className={styles.leaf}>
				<Image src="/leaves/8.svg" fill alt="" />
			</div>
			<div className={styles.leaf}>
				<Image src="/leaves/9.svg" fill alt="" />
			</div>
			<div className={styles.leaf}>
				<Image src="/leaves/10.svg" fill alt="" />
			</div>
			<div className={styles.leaf}>
				<Image src="/leaves/11.svg" fill alt="" />
			</div>
		</div>
	);
}
