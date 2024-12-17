import Link from "next/link";
import styles from "./Gifts.module.scss";
import Image from "next/image";

export type Gift = {
    id: number | string;
    productName: string;
    productUrl: string;
    productImage: string;
}

export default function Gifts({gifts}: {gifts: Gift[]}) {
	return (
		<div className={styles.container}>
			{gifts.map(item => (
				<div className={styles.item} key={item.id}>
					<div className={styles.title}>
						<Link href={item.productUrl} target="_blank">
							{item.productName}
						</Link>
					</div>
					<div className={styles.image}>
						<Image src={item.productImage} fill alt="" />
					</div>
				</div>
			))}
		</div>
	);
}
