import { Details, TravelDetailsHeader } from "@/components/travelDetails";
import styles from "./Page.module.scss";

export default function TravelDetails() {
	return (
		<div data-animation="layout" style={{ position: "relative" }}>
			<div data-animation="layout-content">
				<div className={styles.container}>
					<TravelDetailsHeader />
					<Details />
				</div>
			</div>
		</div>
	);
}
