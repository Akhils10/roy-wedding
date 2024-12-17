import Image from "next/image";
import styles from "./PhotoGallery.module.scss";
import Carousel, { Modal, ModalGateway } from "react-images";
import { useCallback, useState } from "react";

export type PhotoProp = {
	src: string;
	width: number;
	height: number;
};
export default function PhotoGallery({
	photos,
	title,
}: {
	photos: PhotoProp[];
	title?: string;
}) {
	const [currentImage, setCurrentImage] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);

	const openLightbox = useCallback((index: number) => {
		setCurrentImage(index);
		setViewerIsOpen(true);
	}, []);

	const closeLightbox = () => {
		setCurrentImage(0);
		setViewerIsOpen(false);
	};

	return (
		<div className={styles.container}>
			{title && (
				<div className={styles.title}>
					<h3>{title}</h3>
				</div>
			)}

			<div className={styles.gallery}>
				{photos.map((photo, index) => (
					<div
						className={styles.galleryItem}
						key={index}
						onClick={() => openLightbox(index)}
					>
						<Image src={photo.src} fill alt="" />
					</div>
				))}
			</div>

			{/* @ts-ignore */}
			<ModalGateway>
				{viewerIsOpen ? (
					<Modal onClose={closeLightbox}>
						<Carousel
							// styles={}
							currentIndex={currentImage}
							views={photos.map(x => ({
								...x,
								source: x.src,
							}))}
						/>
					</Modal>
				) : null}
			</ModalGateway>
		</div>
	);
}
