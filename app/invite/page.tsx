import { Resources } from "@/components/rsvp";
import styles from "./Page.module.scss";

export default function RsvpPage() {
	return (
		<div data-animation="layout" style={{ position: "relative" }}>
			<div data-animation="layout-content">
				<div className={styles.container}>
					<Resources />
				</div>
			</div>
		</div>
	);
}
