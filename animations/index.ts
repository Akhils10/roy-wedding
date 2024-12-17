import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/all";
import gsap from "gsap";
import { Layout } from "./components/layout";
import { Preloader } from "./components/preloader";

// declare type for globalthis.ismobile
declare global {
	var ismobile: boolean;
}

export class App {
	preloader: any;
	layout: any;

	constructor({ ismobile }: { ismobile: boolean }) {
		// set mobile variable
		globalThis.ismobile = ismobile;

		// register scroll trigger
		gsap.registerPlugin(ScrollTrigger, Draggable);

		// iitialise preloader
		// this.createPreloader();
		// this.onPreloaded();
	}

	createPreloader() {
		this.preloader = new Preloader();
		this.preloader.once("preload-completed", this.onPreloaded.bind(this));
	}

	onPreloaded() {
		// call createAnimations method
		this.createAnimations();
	}

	createAnimations() {
		this.layout = new Layout();
	}
}
