"use client";

import { Button, SmallLoader } from "@/components/ui";
import styles from "./AddGuest.module.scss";
import { useState } from "react";
import fetcher from "@/utils/fetcher";
import toast from "react-hot-toast";

export interface GuestPayload {
	name: string;
	email?: string;
	phoneNumber?: string;
	guestType: "REGULAR" | "GROUP";
	allowedInvites?: number;
    tag?: string;
}

export default function AddGuest() {
	const [isLoading, setIsLoading] = useState(false);
	const [guests, setGuests] = useState<GuestPayload[]>([]);
	const [guestInputs, setGuestInputs] = useState<GuestPayload[]>([
		{ name: "", guestType: "REGULAR" },
	]);

	const handleChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		const newGuestInputs = [...guestInputs];
		newGuestInputs[index] = { ...newGuestInputs[index], [name]: value };
		setGuestInputs(newGuestInputs);
	};

	const addGuestRow = () => {
        const currentGuest = guestInputs[guestInputs.length - 1];
        if(!currentGuest.name) {
            toast.error('At least, guest full name is required')
            return;
        }
		setGuests([...guests, guestInputs[guestInputs.length - 1]]);
		setGuestInputs([
			...guestInputs,
			{ name: "", guestType: "REGULAR" },
		]);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const response = await fetcher("/api/guest/add-multiple-guests", "POST", guests);
            console.log(response, "response");
            
			setGuests([]);
			setGuestInputs([
				{ name: "", email: "", phoneNumber: "", guestType: "REGULAR" },
			]);
		} catch (error) {
			console.error("Error adding guests:", error);
			toast.error("Error adding guests");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Add Guest</h3>
			</div>

			<div className={styles.form_container}>
				{guestInputs.map((guest, index) => (
					<div className={styles.form_group} key={index}>
						<input
							type="text"
							className={styles.input}
							placeholder="name"
							required
							value={guest.name}
							onChange={e => handleChange(index, e)}
							name="name"
						/>
						<input
							type="email"
							className={styles.input}
							placeholder="email"
							value={guest.email}
							onChange={e => handleChange(index, e)}
							name="email"
						/>
						<input
							type="text"
							className={styles.input}
							placeholder="phone number"
							value={guest.phoneNumber}
							onChange={e => handleChange(index, e)}
							name="phoneNumber"
						/>
						<select
							className={styles.input}
							value={guest.guestType}
							onChange={e => handleChange(index, e)}
						>
							<option value="REGULAR">Regular</option>
							<option value="GROUP">Group</option>
							<option value="STAFF">Staff</option>
						</select>
						{guest.guestType !== "REGULAR" && (
							<input
								type="number"
								className={styles.input}
								placeholder="allowedInvited"
								onChange={e => handleChange(index, e)}
							/>
						)}
						<input
							type="text"
							className={styles.input}
							placeholder="tag"
							name="tag"
							onChange={e => handleChange(index, e)}
						/>
						<Button className={styles.button} onClick={addGuestRow}>
							Add
						</Button>
					</div>
				))}

				<Button
					className={styles.button_submit}
					onClick={handleSubmit}
					disabled={isLoading}
				>
					Submit {isLoading && <SmallLoader />}
				</Button>
			</div>
		</div>
	);
}
