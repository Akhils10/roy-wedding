import { Component } from "../classes/component";
import { Parallax } from "../classes/parallax";
import gsap from "gsap";
import { each } from "lodash";

export class Layout extends Component {
	constructor() {
		super({
			element: "[data-animation='layout']",
			children: {
				header: "[data-animation='header']",
				layoutContent: "[data-animation='layout-content']",
			},
		});
		this.revealLayout();
		this.revealHeader();
	}

	revealLayout() {
		gsap.to(this.children.layoutContent[0], {
			autoAlpha: 1,
			x: 0,
			y: 0,
			display: "block",
			ease: "expo.inOut",
			duration: 2.5,
		});
	}
	revealHeader() {
		gsap.fromTo(
			this.children.header[0],
			{
				y: -400,
			},
			{
				autoAlpha: 1,
				x: 0,
				y: 0,
				display: "block",
				ease: "elastic.out(1, 0.5)",
				delay: 2.5,
				duration: 1.5,
			}
		);
	}
}
