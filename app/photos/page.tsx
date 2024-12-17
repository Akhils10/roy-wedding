"use client";

import { PhotoGallery, PhotoProp } from "@/components/photos";
import styles from "./Page.module.scss";

const engagementParty: PhotoProp[] = [
	{ src: "/photos/engagement/1.jpg", width: 211, height: 360 },
	{ src: "/photos/engagement/2.jpg", width: 211, height: 360 },
	{ src: "/photos/engagement/3.jpg", width: 211, height: 360 },
	{ src: "/photos/engagement/4.jpg", width: 211, height: 360 },
	{ src: "/photos/engagement/5.jpg", width: 360, height: 216 },
	{ src: "/photos/engagement/6.jpg", width: 211, height: 360 },
	{ src: "/photos/engagement/7.jpg", width: 328, height: 216 },
];

const introduction: PhotoProp[] = [
	{ src: "/photos/introduction/1.jpg", width: 211, height: 360 },
	{ src: "/photos/introduction/2.jpg", width: 211, height: 360 },
	{ src: "/photos/introduction/3.jpg", width: 211, height: 360 },
	{ src: "/photos/introduction/4.jpg", width: 211, height: 360 },
	{ src: "/photos/introduction/5.jpg", width: 211, height: 360 },
	{ src: "/photos/introduction/6.jpg", width: 211, height: 360 },
	{ src: "/photos/introduction/7.jpg", width: 328, height: 216 },
];

const prewedding: PhotoProp[] = [
	{ src: "/photos/prewedding/1.jpg", width: 211, height: 360 },
	{ src: "/photos/prewedding/2.jpg", width: 211, height: 360 },
	{ src: "/photos/prewedding/3.jpg", width: 211, height: 360 },
	{ src: "/photos/prewedding/4.jpg", width: 211, height: 360 },
	{ src: "/photos/prewedding/5.jpg", width: 211, height: 360 },
	{ src: "/photos/prewedding/6.jpg", width: 211, height: 360 },
	{ src: "/photos/prewedding/7.jpg", width: 328, height: 216 },
	{ src: "/photos/prewedding/8.jpg", width: 328, height: 216 },
	{ src: "/photos/prewedding/9.jpg", width: 328, height: 216 },
	{ src: "/photos/prewedding/10.jpg", width: 328, height: 216 },
	{ src: "/photos/prewedding/11.jpg", width: 211, height: 360 },
	{ src: "/photos/prewedding/12.jpg", width: 211, height: 360 },
];

export default function Photos() {
	return (
		<div data-animation="layout" style={{ position: "relative" }}>
			<div data-animation="layout-content">
				<div className={styles.container}>
					<PhotoGallery title="Engagement Party" photos={engagementParty} />
					<PhotoGallery title="Introduction" photos={introduction} />
					<PhotoGallery title="Pre Wedding" photos={prewedding} />
				</div>
			</div>
		</div>
	);
}
