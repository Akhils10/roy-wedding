"use client";

import React, { useEffect, useState } from "react";
import styles from "./BarcodeScanner.module.scss";
import fetcher from "@/utils/fetcher";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Button, QRCodeGenerator, SmallLoader } from "@/components/ui";
import { GuestUnionType } from "@/lib/helpers/types";
import toast from "react-hot-toast";
import { capitalize } from "@/utils";

const BarcodeScanner: React.FC = () => {
	const [guest, setGuest] = useState<GuestUnionType | null>(null);
	const [data, setData] = useState<string>("");
	const [pauseScanner, setPauseScanner] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const handleScan = async (data: string | null) => {
			if (data) {
				try {
					setIsLoading(true);
					const response = await fetcher(`/api/guest/find?id=${data}`, "GET");
					if (response.data) {
						setGuest(response.data);
					}
				} catch (err) {
					console.error("Error fetching guest:", err);
					toast.error("Error fetching guest details. Please try again.");
				} finally {
					setIsLoading(false);
				}
			}
		};

		handleScan(data);
	}, [data]);

	return (
		<div className={styles.barcodeScanner}>
			<div className={styles.header}>
				<h3>Scan Guest Barcode</h3>
			</div>

			<div className={styles.container}>
				<Scanner
					onScan={result => {
						setData(result[0].rawValue);
						setPauseScanner(true);
					}}
					paused={pauseScanner}
				/>
				<Button
					className={styles.button}
					onClick={() => setPauseScanner(p => !p)}
				>
					Scan
				</Button>
			</div>
			{isLoading && <p className={styles.Loading}>Searching for reservation...</p>}
			{guest && <DisplayGuestCard guest={guest} />}
		</div>
	);
};

export function DisplayGuestCard({ guest, canAdmit = false }: { guest: GuestUnionType, canAdmit?: boolean }) {
	const [isAdmitting, setIsAdmitting] = useState(false);
	const guestType = guest?.guestType?.toLowerCase() as "group" | "staff" | "regular";
	const inviteCount =
		(guestType === "regular" ? 1 : guest?.[guestType]?.inviteCount) || 1;
	const totalAdmitted =
		(guestType === "regular"
			? guest?.isAdmitted
				? 1
				: 0
			: guest?.[guestType]?.admittedCount) || 0;
	const isAdmittable =
		guestType === "regular" ? totalAdmitted < 1 : totalAdmitted < inviteCount;

	const onClickAdmit = async (guestId: string) => {
		try {
			setIsAdmitting(true);
			const response = await fetcher(`/api/admin/guest/admit`, "POST", {
				id: guestId,
			});
			toast.success("Guest admitted! Please allow entrance", { duration: 5000 });
		} catch (error: any) {
			console.log(error);
			toast.error(error.message, { duration: 5000 });
		} finally {
			setIsAdmitting(false);
		}
	};
	return (
		<div className={styles.guestCard}>
			<h3>Guest Details</h3>
			<p>
				<strong>Name:</strong> {capitalize(guest?.name)}
			</p>
			{guest?.phoneNumber && (
				<p>
					<strong>Phone Number:</strong> *****{guest.phoneNumber.slice(5)}
				</p>
			)}
			<p>
				<strong>Guest Type:</strong> {guestType === 'regular' ? 'Individual' : capitalize(guestType)}
			</p>
			<p>
				<strong>Allowed Invites:</strong> {inviteCount}
			</p>
			<p>
				<strong>Total Admitted:</strong> {totalAdmitted}
			</p>
			{isAdmittable && canAdmit && (
				<Button disabled={isAdmitting} className={styles.button} onClick={() => onClickAdmit(guest.id)}>
					Admit {isAdmitting && <SmallLoader />}
				</Button>
			)}
		</div>
	);
}

export default BarcodeScanner;
