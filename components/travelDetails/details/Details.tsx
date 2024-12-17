import Link from "next/link";
import styles from "./Details.module.scss";
import Image from "next/image";

const travelDetails = [
	{
		link: "https://www.google.com/maps/dir//18+Ojomoh+Street,+Off+Etete+Road,+GRA,+Benin+City,+Edo/@6.2983369,5.5404643,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1040d33e7b09dc03:0x758a42e291be47!2m2!1d5.6228845!2d6.2983002?entry=ttu",
		linkText: "Greyfield apartment, 18 Ojomoh Street, GRA",
		image: "/traveldetails/greyfield.jpeg",
	},
	{
		link: "https://www.google.com/maps/dir//cyclers+luxury+apartments/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x1040d1ca5501882f:0x7e2f5cfc2f638e1a?sa=X&ved=1t:3061&ictx=111",
		linkText: "Cyclers Luxury Apartments",
		image: "/traveldetails/cyclers.jpeg",
	},
	{
		link: "https://www.google.com/maps/dir//Morzi+Hotels+%26+Suites,+Plot+209+Ugbor,+By,+Ugbor+Road+Country+Home+Road,+Junctio,+Benin+City/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x1040d1afcc898f29:0x6d5258c7ecaf14a7?sa=X&ved=1t:57443&ictx=111",
		linkText: "Morzi Hotel, Ugbor Rd, Country Home Rd, GRA",
		image: "/traveldetails/morzi.jpeg",
	},
	{
		link: "https://www.google.com/maps/dir//8J4G%2B759,+Ibude+Ln,+Oka,+Benin+City+300105,+Edo/@6.3056439,5.5431832,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1040d30a0c426819:0xf2991a006daeaa40!2m2!1d5.6255582!2d6.3056431?entry=ttu",
		linkText: "Limoh Suites",
		image: "/traveldetails/limoh.jpeg",
	},
	{
		link: "https://bookhotels.ng/hotel/boston-hotel",
		linkText: "Boston Hotel & Signatures",
		image: "/traveldetails/boston.jpeg",
	},
	{
		link: "https://kadacinemas.fusionintel.io/",
		linkText: "Kada Cinemas & Entertainment",
		image: "/traveldetails/kada.jpeg",
	},
];
export default function Details() {
	return (
		<div className={styles.container}>
			{travelDetails.map((item, index) => (
				<div className={styles.item} key={index}>
					<div className={styles.title}>
						<Link href={item.link}>
							{item.linkText}
						</Link>
					</div>
					<div className={styles.image}>
						<Image src={item.image} fill alt="" />
					</div>
				</div>
			))}
		</div>
	);
}
