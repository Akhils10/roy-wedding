"use client";

import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/ui/footer/Footer";

const navItems = [
	{
		title: "Guest List",
		path: "/admin/guest-list",
	},
	{
		title: "Add Guest",
		path: "/admin/guest-list/add",
	},
	// {
	// 	title: "Scan Guest",
	// 	path: "/admin/validate-guest",
	// },
	{
		title: "Registry",
		path: "/admin/registry",
	},
];

const Header = () => {
	const [showMenu, setShowMenu] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

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

			<div className={styles.container}>
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
