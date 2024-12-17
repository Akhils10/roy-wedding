import { BarcodeScanner } from "@/components/admin/scanGuest";
import styles from "../page.module.scss";

export default function Page() {
	return (
		<div className={styles.container}>
			<BarcodeScanner />
		</div>
	);
}
