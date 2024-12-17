import React from "react";
import styles from "./Button.module.scss";

import Image from "next/image";
import SmallLoader from "../smallLoader/SmallLoader";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	buttonType?: "primary" | "secondary" | "transparent";
	children?: React.ReactNode;
	iconPrefix?: string;
	iconSuffix?: string;
	className?: string;
	onClick?: (event?: any) => void;
	isLoading?: boolean;
}

const Button = ({
	buttonType = "primary",
	children = "Join",
	onClick,
	className,
	iconPrefix,
	iconSuffix,
	isLoading,
	...otherProps
}: Props) => {
	return (
		<button
			onClick={onClick}
			className={`${styles[buttonType]} ${className} ${styles.button}`}
			data-type={buttonType}
			{...otherProps}
		>
			{!!iconPrefix && (
				<figure className={styles.button_icon}>
					<Image src={iconPrefix} fill sizes="100vw" alt="" />
				</figure>
			)}
			{!!isLoading && <SmallLoader className={styles.loader} />}
			{children}
			{!!iconSuffix && (
				<figure className={styles.button_icon}>
					<Image src={iconSuffix} fill sizes="100vw" alt="" />
				</figure>
			)}
		</button>
	);
};

export default Button;
