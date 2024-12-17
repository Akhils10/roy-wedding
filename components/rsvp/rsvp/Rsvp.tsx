"use client";

import { useState } from "react";
import { Button, SmallLoader } from "@/components/ui";
import styles from "./Rsvp.module.scss";
import toast from "react-hot-toast";
import fetcher from "@/utils/fetcher";
import { GuestUnionType } from "@/lib/helpers/types";
import { DisplayGuestCard } from "@/components/admin/scanGuest";

export default function Rsvp() {
	const [name, setName] = useState("");
	const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [rsvpGuest, setRsvpGuest] = useState<GuestUnionType | null>(null);

	const onSubmit = async (e: any) => {
		e.preventDefault();
		try {
			setIsSubmitting(true);
			if (!name && !emailOrPhoneNumber) return;
			const email = emailOrPhoneNumber.includes("@")
				? emailOrPhoneNumber
				: undefined;
			const phoneNumber = !emailOrPhoneNumber.includes("@")
				? emailOrPhoneNumber
				: undefined;
			const response = await fetcher("/api/guest/rsvp", "POST", {
				name,
				email,
				phoneNumber,
			});
			if (response.data) setRsvpGuest(response.data);
			toast.success("You have confirmed your reservation", {
				duration: 5000,
			});
			setName("");
			setEmailOrPhoneNumber("");
		} catch (error: any) {
			toast.error(
				error.message ||
					"Couldn't complete RSVP. Please try a different name, email or phone number",
				{
					duration: 5000,
				}
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<span>Secure your invitation. Let us know you’ll be attending.</span>
			</div>
			<div className={styles.input_group}>
				<input
					type="text"
					placeholder="Full name"
					onChange={e => setName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Email or Phone number"
					onChange={e => setEmailOrPhoneNumber(e.target.value)}
				/>
				<Button
					className={styles.button}
					onClick={onSubmit}
					disabled={isSubmitting}
				>
					RSVP
					{isSubmitting && <SmallLoader />}
				</Button>
			</div>

			{rsvpGuest && <DisplayGuestCard guest={rsvpGuest} />}
		</div>
	);
}
