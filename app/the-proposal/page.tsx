"use client";

import { Photo, Story, StoryProp } from "@/components/ourstory";
import styles from "./Page.module.scss";
import { PhotoGallery, PhotoProp } from "@/components/photos";

const stories: StoryProp[] = [
	{
		image: "/ourstory/annie&philip.png",
		title: "The Proposal",
		secondaryImage: "/ourstory/proposal.png",
		story: (
			<>
				In the quiet chapters of my heart, a love story began long ago. A tale
				that unfolded in the halls of C.H.S, where two young souls danced in the
				innocence of youth. We wrote a chapter, a fleeting romance that time
				temporarily concealed.
				<br /> Yet, your image lingered, a masterpiece painted on the canvas of my
				memories. Through Uni, our connection may have waned, but your essence
				remained etched in my heart. Your smile, your style, your writings, your
				art—time only deepened the hues of my affection.
				<br />
				Almost a decade later😜, our paths converged again, and I didn&apos;t need
				words to know my heart&apos;s desire. I wanted to marry you, to turn those
				painted memories into a lifelong mural. Your beauty transcends, your
				talents awe, in your smile, I find the reflection of a thousand sunsets;
				in your style, the embodiment of elegance. Your art, a language that
				speaks directly to my soul. Each day, my love for you grows, a melody that
				harmonizes with the rhythm of our shared journey.
				<br />
				<br />
				So, here&apos;s to a new chapter, a story of love rediscovered.{" "}
				<strong>
					In the pages of a book, a secret is held—a love-shaped void where a
					ring patiently rests
				</strong>
				. As you unveil this tale, as you read the poem penned from the depths of
				my soul, know that it&apos;s not just a<strong>proposal;</strong>{" "}
				it&apos;s a promise to make the pictures in my heart permanent. Will you
				marry me and let our love story unfold in the permanence of forever?
			</>
		),
	},
];

const engagementParty: PhotoProp[] = [
	{ src: "/ourstory/proposal.png", width: 211, height: 360 },
	{ src: "/photos/engagement-party/12.jpeg", width: 211, height: 360 },
	{ src: "/ourstory/annie&philip.png", width: 211, height: 360 },
	{ src: "/photos/engagement-party/2.jpeg", width: 211, height: 360 },
	{ src: "/photos/engagement-party/7.jpeg", width: 328, height: 216 },
	{ src: "/photos/engagement-party/8.jpeg", width: 328, height: 216 },
	{ src: "/photos/engagement-party/3.jpeg", width: 211, height: 360 },
	{ src: "/photos/engagement-party/14.jpeg", width: 211, height: 360 },
	{ src: "/photos/engagement-party/13.jpeg", width: 211, height: 360 },
];
export default function OurStory() {
	return (
		<div data-animation="layout" style={{ position: "relative" }}>
			<div data-animation="layout-content">
				<div className={styles.container}>
					{stories.map((story, index) => (
						<Story story={story} key={index} />
					))}
				</div>

				<div className={styles.gallery}>
					<PhotoGallery title="Engagement Party" photos={engagementParty} />
				</div>

				<Photo />
			</div>
		</div>
	);
}
