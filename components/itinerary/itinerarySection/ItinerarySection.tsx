import Image from "next/image";
import styles from "./ItinerarySection.module.scss";

const itenerary = [
	{
		thumbnail: "/itinerary/hotel.jpeg",
		title: {
			action: "Hotel Check In",
			time: "2:00 pm",
			date: "Fri, January 3rd, 2025",
		},
		info: [
			{
				title: "Mc Glova Hotel Jeddo",
				text: "Mc Glova Hotel Jeddo, Jeddo Warri",
			},
            {
				title: "Hot Ice Hotel",
				text: "Okuntade street, Jeddo, Warri",
			},
            {
				title: "Ivy Lush Hotel",
				text: "NPA Express Rd, Effurun",
			},
		],
	},
    {
		thumbnail: "/photos/prewedding/12.jpg",
		isReversed: true,
		title: {
			action: "Trad Ceremony",
			time: "12:00pm",
			date: "Thurs, 2nd January , 2025",
            extraText: "Edeke Street, Kokori Inland, Ethiope East Delta State"
		},
		info: [
			{
				title: "Traditional Rites",
				text: "Nothing fancy, just a man coming to take home a wife. Come as you are.",
			},
            {
				title: "Dress Code",
				text: "Look sharp",
			},
		],
	},
    {
		thumbnail: "/itinerary/cakes.jpeg",
		title: {
			action: "The wedding",
			time: "10:00am",
			date: "Sat. 4th January 2025",
            extraText: "St Theresa Catholic Church Ubeji, Warri Delta State"
		},
		info: [
            {
				title: "Reception",
				text: "1:00pm - Brivy’s Galleria, Jeddo Warri Delta State. ",
			},
            {
				title: "After After Party",
				text: "6pm - Brivy’s Galleria, Jeddo Warri Delta State",
			},
		],
	},
    {
		thumbnail: "/itinerary/church.jpeg",
        isReversed: true,
		title: {
			action: "Thanksgiving",
			time: "10:00am",
			date: "Sun, January 5th 2025",
            extraText: "St Theresa Catholic Church Ubeji, Delta State"
		},
		info: [
			{
				title: "Thanksgiving Service",
				text: "Thanksgiving Service at the bride's family church.",
			},
            {
				title: "Dress Code",
				text: "No dress code required. Just wear your Sunday best.",
			},
		],
	},
];

export default function ItinerarySection() {
	return (
		<div className={styles.section}>
			{itenerary.map((item, index) => (
				<div className={styles.item} data-reversed={!!item.isReversed} key={index}>
					<div className={styles.image}>
						<Image src={item.thumbnail} fill alt="" />
					</div>

					<div className={styles.content}>
						<div className={styles.title}>
							<h3>{item.title.action}</h3>
							<span>{item.title.time}</span>
							<span>{item.title.date}</span>
							{item.title.extraText && <span>{item.title.extraText}</span>}
						</div>
						{item.info.map((info, index) => (
							<div className={styles.info} key={index}>
								<h3>{info.title}</h3>
								<span>{info.text}</span>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
