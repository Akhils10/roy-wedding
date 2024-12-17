import styles from "./Page.module.scss";
import { ItineraryHeader, ItinerarySection } from "@/components/itinerary";

export default function OurStory() {
	return (
		<div data-animation="layout" style={{ position: "relative" }}>
			<div data-animation="layout-content">
				<div className={styles.container}>
					<ItineraryHeader />
					<ItinerarySection />
				</div>
			</div>
		</div>
	);
}
