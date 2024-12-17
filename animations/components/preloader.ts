import { Component } from "../classes/component";

import { flattenObj } from "@/utils";

import { each } from "lodash";
import gsap from "gsap";

import { getDistanceFromMidViewport } from "../helpers";
// import { media } from "@/constants/media";

export class Preloader extends Component {
	progress: number = 0;
	percentage: number = 0;
	allMedia: string[] = [];

	constructor() {
		super({
			element: "[data-animation='preloader']",
			children: {
				header: "[data-animation='header']",
				layoutContent: "[data-animation='layout-content']",
			},
		});

		document.body.scrollTop = 0;
		document.body.style.overflow = "hidden";

		this.initialAnimation();
		this.startLoad();

		// initialise vars
		this.progress = 0;
	}

	async initialAnimation() {
		// elements
		const layoutContent = this.children.layoutContent[0];
		const header = this.children.header[0];

		await Promise.all([
			gsap.set(layoutContent, {
				autoAlpha: 0,
				display: "none",
				y: "100vh",
			}),

			gsap.set(header, {
				autoAlpha: 0,
				y: "100vh",
			}),
		]);
	}

	startLoad(): void {
		// const allmedia = flattenObj(media);
		const allmedia = flattenObj({
			empty: "https://unsplash.com/photos/a-surfer-riding-a-wave-in-front-of-a-city-skyline-RSFKjV9y2wM",
			empty2: "https://unsplash.com/photos/the-night-sky-is-filled-with-stars-and-the-milky-shines-brightly-1-AUc8mQWV4",
			empty3: "https://unsplash.com/photos/a-woman-in-a-pink-dress-made-out-of-pink-paper-0qo1uyJxXm4",
		});
		const shortenedMedia = allmedia.slice(0, 2);
		this.allMedia = shortenedMedia;

		each(this.allMedia, (url: any, index: number) => {
			setTimeout(() => {
				const fakeImage: HTMLImageElement = new Image();
				fakeImage.src = url;

				fakeImage.onload = () => {
					this.onAssetLoaded();
				};
			}, (25 * 100) / this.allMedia.length);
		});
	}

	onAssetLoaded(): void {
		this.progress++;
		this.percentage = Math.round((this.progress / this.allMedia.length) * 100);

		if (this.percentage === 100) {
			this.onLoadingComplete();
		}
	}

	revealLogo(): void {
		const tl: GSAPTimeline = gsap.timeline();

		const preloaderLogoText = this.children.preloaderLogoText;
		each(preloaderLogoText, (letter: any) => {
			tl.fromTo(
				letter,
				{
					y: "100vh",
					autoAlpha: 0,
				},
				{
					autoAlpha: 1,
					y: 0,
					// ease: "expo.inOut",
					duration: 2.5,
					ease: "elastic.out(1, 0.5)",
					stagger: 0.5,
					delay: 0.1,
					// duration: 1.5,
				},
				"<"
			);
		});
	}

	onLoadingComplete(): void {
		const tl: GSAPTimeline = gsap.timeline({ delay: 1 });

		tl.to(
			this.children.status,
			{
				duration: 1,
				autoAlpha: 0,
				y: 20,
				ease: "expo.inOut",
			},
			"<"
		);

		tl.call(() => {
			tl.kill();
			this.outro();
		});
	}

	outro() {
		// create new timeline to animate both old line and new one
		const newtl: GSAPTimeline = gsap.timeline();

		// preloading is now complete, kill preloader
		newtl.call(() => {
			// kill this timeline
			newtl.kill();

			// kill preloader
			this.kill();
		});
	}

	kill(): void {
		this.emit("preload-completed");
		document.body.style.overflowY = "auto";

		gsap.to(this.element, {
			// autoAlpha: 0,
			y: "-100vh",
			ease: "expo.inOut",
			duration: 2,
		});
	}
}
