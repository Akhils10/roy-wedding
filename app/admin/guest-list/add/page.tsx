import { AddGuest } from "@/components/admin/guestList";
import styles from "../../page.module.scss";

export default function Page() {
	return (
		<div className={styles.container}>
			<AddGuest />
		</div>
	);
}
