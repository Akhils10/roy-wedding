import styles from "./Page.module.scss";
import { PhotoSection } from "@/components/weddingparty";

type Photo = {
	image: string;
	name: string;
};

const bridalMaids: Photo[] = [
	{
		image: "/weddingparty/bridal-train/Chisom.jpg",
		name: "Chisom",
	},
	{
		image: "/weddingparty/bridal-train/Covy.jpg",
		name: "Covy",
	},
	{
		image: "/weddingparty/bridal-train/Cynthia.jpg",
		name: "Cynthia",
	},
	{
		image: "/weddingparty/bridal-train/Daniella.jpg",
		name: "Daniella",
	},
	{
		image: "/weddingparty/bridal-train/Fejiro.jpg",
		name: "Fejiro",
	},
	{
		image: "/weddingparty/bridal-train/Motolani.jpg",
		name: "Motolani",
	},
	{
		image: "/weddingparty/bridal-train/Oghale.jpg",
		name: "Oghale",
	},
];

const groomsmen: Photo[] = [
	{
		image: "/weddingparty/grooms-men/Aise.jpg",
		name: "Aise",
	},
	{
		image: "/weddingparty/grooms-men/Favour.jpg",
		name: "Favour",
	},
	{
		image: "/weddingparty/grooms-men/Grandpa.jpg",
		name: "Grandpa",
	},
	{
		image: "/weddingparty/grooms-men/Mackay.jpg",
		name: "Mackay",
	},
	{
		image: "/weddingparty/grooms-men/Nicholas.jpg",
		name: "Nicholas",
	},
	{
		image: "/weddingparty/grooms-men/Stanley.jpg",
		name: "Stanley",
	},
];

export default function WeddingParty() {
	return (
		<div data-animation="layout" style={{ position: "relative" }}>
			<div data-animation="layout-content">
				<div className={styles.container}>
					<PhotoSection title="Bridal Train" photos={bridalMaids} />
					<PhotoSection title="Groomsmen" photos={groomsmen} />
				</div>
			</div>
		</div>
	);
}
