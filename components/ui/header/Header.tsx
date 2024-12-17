"use client";

import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "../footer/Footer";
import { countdownToEvent } from "@/utils";

const navItems = [
	{
		title: "Home",
		path: "/",
	},
	{
		title: "Photos",
		path: "/photos",
	},
	{
		title: "Wedding Party",
		path: "/wedding-party",
	},
	{
		title: "Itinerary",
		path: "/itinerary",
	},
	{
		title: "Registry",
		path: "/gifts-registry",
	},
	{
		title: "Q & A",
		path: "/faq",
	},
	{
		title: "Invite",
		path: "/invite",
	},
];

const Header = ({ hideContent = false }) => {
	const [countdown, setCountdown] = useState("");
	const [showMenu, setShowMenu] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		setCountdown(countdownToEvent());
	}, []);

	useEffect(() => {
		if (showMenu) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [showMenu]);

	return (
		<header className={styles.header} data-animation="header">
			<div className={styles.mobile_header}>
				<div className={styles.small_row}>
					<div className={styles.text_logo}>
						<div className={styles.logo_text}>Y & R</div>
					</div>

					<div
						className={styles.hamburger}
						onClick={() => setShowMenu(p => !p)}
					>
						<Image src="/header/hamburger.svg" fill alt="" />
					</div>
				</div>

				{showMenu && (
					<div className={styles.mobile_nav}>
						<div className={styles.nav_content}>
							<div
								className={styles.close_area}
								onClick={() => setShowMenu(false)}
							>
								<Image
									src="/header/close.svg"
									width={16}
									height={16}
									alt=""
								/>
							</div>
							<div className={styles.nav_content_group}>
								<div className={styles.nav_container}>
									{navItems.map(item => (
										<div
											className={styles.nav_item}
											data-active={pathname === item.path}
											key={item.title}
										>
											<a
												onClick={() => {
													setShowMenu(false);
													router.push(item.path);
												}}
												className={styles.link}
											>
												{item.title}
											</a>
										</div>
									))}
								</div>
								<Footer />
							</div>
						</div>
					</div>
				)}
			</div>
			{!hideContent && (
				<div className={styles.hero_container}>
					<Image src="/photos/prewedding/12.jpg" fill alt="" />
				</div>
			)}
			<div className={styles.container}>
				{!hideContent && (
					<div className={styles.logo_container}>
						<div className={styles.logo_text}>Yoma & Robert</div>
						<div className={styles.header_text}>
							<span>January 04, 2025 • WARRI, NIGERIA</span>
							<span>{countdown}</span>
						</div>
					</div>
				)}

				<div className={styles.nav}>
					<div className={styles.nav_container}>
						{navItems.map(item => (
							<div
								className={styles.nav_item}
								data-active={pathname === item.path}
								key={item.title}
							>
								<Link href={item.path} className={styles.link}>
									{item.title}
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
