import Hero from "@/components/ui/hero/Hero";
import { Leaves, Photo, Rsvp, WeddingInfo, Welcome } from "@/components/home";

export default function Home() {
	return (
		<div data-animation="layout" style={{ position: "relative" }}>
			<div data-animation="layout-content">
				<div style={{ position: "relative" }}>
					<Hero />
					<Leaves />
				</div>
				<Welcome />
				{/* <Rsvp /> */}
				<WeddingInfo />
				<Photo />
			</div>
		</div>
	);
}
