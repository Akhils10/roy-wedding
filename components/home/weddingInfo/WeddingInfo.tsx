import styles from "./WeddingInfo.module.scss";

const eventInfo = [
	{
		title: "Bridal Party",
		date: "January 3, 2025",
		time: "6:00 pm–9:00 pm",
		address1: "Dreamz lounge Ubeji,",
		address2: "Warri, Delta state",
		actionText: "Colour Of The Day",
		buttonText: "White",
		buttonType: "outline",
	},
	{
		title: "Wedding Ceremony",
		date: "January 4, 2025",
		time: "10:00 am–12:00 pm",
		address1: "St Theresa’s Catholic Church Ubeji,",
		address2: "Warri, Delta state",
		actionText: "Colour Of The Day",
		buttonText: "Blue",
		buttonType: "contained",
	},
	{
		title: "Reception",
		date: "January 4, 2025",
		time: "1:00 pm–6:00 pm",
		address1: "Brivy’s Galleria, Jeddo Warri,",
		address2: "Jeddo, Warri Delta State",
		actionText: "Colour Of The Day",
		buttonText: "Navy Blue",
		buttonType: "contained",
	},
	{
		title: "After Party",
		date: "January 4, 2025",
		time: "6:00 pm–10:00 pm",
		address1: "Brivy’s Galleria, Jeddo Warri,",
		address2: "Jeddo, Warri Delta State",
		actionText: "Theme",
		buttonText: "#RomanticXperience",
		buttonType: "contained",
	},
];
export default function WeddingInfo() {
	return (
		<div className={styles.container}>
			{eventInfo.map((item, index) => (
				<div className={styles.event} key={index}>
					<div className={styles.item}>
						<span className={styles.title}>{item.title}</span>
					</div>

					<div className={styles.item}>
						<span className={styles.text}>{item.date}</span>
						<span className={styles.text}>{item.time}</span>
					</div>

					<div className={styles.item}>
						<span className={styles.small_text}>{item.address1}</span>
						<span className={styles.small_text}>{item.address2}</span>
					</div>

					<div className={styles.item}>
						<span className={styles.action_text}>{item.actionText}:</span>
						<button className={`${styles.button} ${styles[item.buttonType]}`}>
							<span className={styles.text}>{item.buttonText}</span>
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
