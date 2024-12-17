import Image from "next/image";
import styles from "./Story.module.scss";
import { ReactElement } from "react";

export type StoryProp = {
	image: string;
	imageMobile?: string;
	story: string | ReactElement;
	title: string;
	isReversed?: boolean;
	secondaryImage?: string;
};

export default function Story({ story }: { story: StoryProp }) {
	return (
		<div className={styles.container}>
			<div className={styles.story_image}>
				<Image src={story.image} fill alt="" />
				{story.secondaryImage && (
					<div className={styles.secondaryImage_overlay}>
						<div className={styles.secondary_image}>
							<Image src={story.secondaryImage} fill alt="" />
						</div>
					</div>
				)}
			</div>

			<div className={styles.story}>
				<h3>{story.title}</h3>
				<p>{story.story}</p>
			</div>
		</div>
	);
}
