import styles from './ItineraryHeader.module.scss';

export default function ItineraryHeader() {
	return (
		<div className={styles.header}>
			<h3>Itinerary</h3>
			<p>
				There will be plenty of events happening during the course of our wedding
				celebration, hence this specially curated itinerary to keep you informed
				with all the details you need to have the most enjoyable event and
				eventful weekend and also to help you plan your schedule. See you there!
			</p>
		</div>
	);
}
