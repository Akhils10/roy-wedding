import styles from "./Details.module.scss";

const faq = [
	{
		id: 1,
		question: "WHAT IS THE DRESS CODE FOR THE WEDDING?",
		answer: "The dress code for our wedding is formal/trad attire in different shades of BLUE. Please refrain from wearing white. Your favorite shade of blue will do.",
	},
	{
		id: 2,
		question: "CAN I BRING A PLUS ONE?",
		answer: "Every event on our wedding itinerary is strictly RSVP only. We will only be able to accommodate those listed on your invitation. Please do not bring uninvited guests as they will not be admitted into the venue.",
	},
	{
		id: 3,
		question: "CAN I ENTER THE HALL BEFORE 1:30PM?",
		answer: "No. Please admittance into the hall starts by 1:30pm.",
	},
	{
		id: 4,
		question: "I AM FROM OUT OF TOWN. WHERE SHOULD I BOOK MY HOTEL?",
		answer: "We have more information regarding travel and stay under the Travel tab. Most questions regarding accommodations for our out of town guests will be answered there.",
	},
	{
		id: 6,
		question: "WE LOVE YOU BOTH. WHERE CAN WE SEND GIFTS?",
		answer: "Feel free to visit the Registry tab and bless us with one (or two...or three) of the gifts in our registry.",
	},
	{
		id: 7,
		question: "WHERE SHOULD GUESTS PARK? IS PARKING FREE?",
		answer: "Both the ceremony site and reception hall have plenty of free parking.",
	},
];
export default function Details() {
	return (
		<div className={styles.container}>
			{faq.map(item => (
				<div className={styles.item} key={item.id}>
					<h3>{item.question}</h3>
					<p>{item.answer}</p>
				</div>
			))}
		</div>
	);
}
