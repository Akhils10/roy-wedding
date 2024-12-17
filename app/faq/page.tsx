import { Details, QAHeader } from "@/components/qanda";
import styles from "./Page.module.scss";

export default function TravelDetails() {
	return (
		<div data-animation="layout" style={{ position: "relative" }}>
			<div data-animation="layout-content">
				<div className={styles.container}>
					<QAHeader />
					<Details />
				</div>
			</div>
		</div>
	);
}
