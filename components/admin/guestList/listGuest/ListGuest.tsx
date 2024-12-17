"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import styles from "./ListGuest.module.scss";
import { useFetch } from "@/hooks/useFetcher";
import { Button, Modal, SmallLoader } from "@/components/ui";
import { GuestUnionType } from "@/lib/helpers/types";
import { capitalize } from "@/utils";
import toast from "react-hot-toast";
import fetcher from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

export default function ListGuest() {
	const [guests, setGuests] = useState<GuestUnionType[]>([]);
	// const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isAdmitting, setIsAdmitting] = useState<string[]>([]);
	const [selectedItem, setSelectedItem] = useState<GuestUnionType | null>(null);
	const [admitCountInput, setAdmitCountInput] = useState(1);

	const fetcher = useFetch();
	const fetchData = async () => {
		return await fetcher("/api/admin/guest");
	};

	const { data: response, isLoading } = useQuery({
		queryKey: ["guestList"],
		queryFn: fetchData,
		refetchInterval: 1000,
	});

	useEffect(() => {
		if (response) {
			setGuests(response?.data || []);
		}
	}, [response]);

	const filteredGuestList = useMemo(() => {
		if (!searchTerm) return guests;
		return guests.filter(guest => {
			if (guest.name.includes(searchTerm.toLowerCase())) return true;
			if (guest.phoneNumber?.includes(searchTerm)) return true;
			if (guest.email?.includes(searchTerm)) return true;
			if (guest.tag?.includes(searchTerm)) return true;

			return false;
		});
	}, [guests, searchTerm]);

	const onClickAdmit = async (guestId: string, inviteCount: number = 1) => {
		try {
			setIsAdmitting(p => [...p, guestId]);
			const response = await fetcher(`/api/admin/guest/admit`, "POST", {
				id: guestId,
				admitCount: inviteCount > 1 ? admitCountInput : undefined,
			});
			toast.success("Guest admitted! Please allow entrance", { duration: 5000 });
		} catch (error: any) {
			toast.error(error.message, { duration: 5000 });
		} finally {
			setIsAdmitting(p => {
				const i = p.indexOf(guestId);
				if (i !== -1) p.splice(i, 1);
				return p;
			});
			setAdmitCountInput(1);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Guest list</h3>
			</div>

			<div className={styles.table_responsive}>
				<div className={styles.searchField}>
					<input
						type="text"
						placeholder="search by name, phone number or tag"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className={styles.table}>
					<div className={styles.row}>
						<div className={styles.cell}>
							<h3>s/n</h3>
						</div>
						<div className={styles.cell}>
							<h3>Name</h3>
						</div>
						<div className={styles.cell}>
							<h3>Guest Type</h3>
						</div>
						<div className={styles.cell}>
							<h3>Invite Details</h3>
						</div>
						<div className={styles.cell}>
							<h3>RSVP</h3>
						</div>
						<div className={styles.cell}>
							<h3>Actions</h3>
						</div>
					</div>
					{isLoading && (
						<div className={styles.row}>
							<div className={styles.cell} style={{ width: "100%" }}>
								<span style={{ textAlign: "center" }}>Loading...</span>
							</div>
						</div>
					)}
					{filteredGuestList.map((guest, index) => {
						const guestType = guest.guestType.toLowerCase() as
							| "group"
							| "staff"
							| "regular";
						const inviteCount =
							(guestType === "regular"
								? 1
								: guest[guestType]?.inviteCount) || 1;
						const totalAdmitted =
							(guestType === "regular"
								? guest.isAdmitted
									? 1
									: 0
								: guest[guestType]?.admittedCount) || 0;
						const isAdmittable =
							guestType === "regular"
								? totalAdmitted < 1
								: totalAdmitted < inviteCount;
						return (
							<div className={styles.row} key={guest.id}>
								<div className={styles.cell}>
									<span>{index + 1}</span>
								</div>
								<div className={styles.cell}>
									<div className={styles.row_group}>
										<span>Guest Name: {capitalize(guest.name)}</span>
										<span>
											Phone number:{" "}
											{guest.phoneNumber
												? `*****${guest.phoneNumber?.slice(5)}`
												: ""}
										</span>
										{guest.tag && (
											<span
												className={styles.badge}
												data-type="tag"
											>
												{guest.tag.toUpperCase()}
											</span>
										)}
									</div>
								</div>
								<div className={styles.cell}>
									<span className={styles.badge} data-type="guestType">
										{guestType}
									</span>
								</div>
								<div className={styles.cell}>
									<div className={styles.row_group}>
										<span>Allowed invites: {inviteCount}</span>
										<span>Total Admitted: {totalAdmitted}</span>
									</div>
								</div>
								<div className={styles.cell}>
									<span
										className={styles.badge}
										data-type={
											guest.rsvp
												? "rsvp-confirmed"
												: "rsvp-unconfirmed"
										}
									>
										{guest.rsvp ? "confirmed" : "unconfirmed"}
									</span>
								</div>
								<div className={styles.cell}>
									<div className={styles.row_group}>
										{inviteCount > 1 &&
											inviteCount - totalAdmitted > 0 && (
												<input
													type="number"
													min={1}
													max={Math.max(
														inviteCount - totalAdmitted,
														1
													)}
													placeholder="1"
													onChange={e =>
														setAdmitCountInput(
															+e.target.value
														)
													}
												/>
											)}
										<Button
											className={styles.button}
											onClick={() =>
												onClickAdmit(guest.id, inviteCount)
											}
											disabled={
												!isAdmittable ||
												isAdmitting.includes(guest.id)
											}
										>
											Admit{" "}
											{isAdmitting.includes(guest.id) && (
												<SmallLoader />
											)}
										</Button>
										<Button
											className={styles.button}
											onClick={() => setSelectedItem(guest)}
										>
											Edit
										</Button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			{!!selectedItem && (
				<EditModal
					selectedItem={selectedItem}
					setSelectedItem={setSelectedItem}
				/>
			)}
		</div>
	);
}

function EditModal({
	selectedItem,
	setSelectedItem,
}: {
	selectedItem: GuestUnionType | null;
	setSelectedItem: Dispatch<SetStateAction<GuestUnionType | null>>;
}) {
	const guestType = selectedItem?.guestType.toLowerCase() as
		| "group"
		| "staff"
		| "regular";
	const inviteCount =
		(guestType === "regular" ? 1 : selectedItem?.[guestType]?.inviteCount) || 1;
	const [isLoading, setIsLoading] = useState(false);
	const [guestData, setGuestData] = useState({
		name: selectedItem?.name,
		email: selectedItem?.email,
		phoneNumber: selectedItem?.phoneNumber,
		tag: selectedItem?.tag,
		inviteCount: inviteCount,
	});
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setGuestData(p => ({
			...p,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const response = await fetcher(
				`/api/guest/edit-guest?id=${selectedItem!.id}`,
				"POST",
				guestData
			);
			setSelectedItem(null);
			toast.success("Guest info updated!");
		} catch (error) {
			toast.error("Error updating guests");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal openModal={!!selectedItem} close={() => setSelectedItem(null)}>
			<div className={styles.form_container}>
				<div className={styles.form_group}>
					<div className={styles.input_group}>
						<label>Name</label>
						<input
							type="text"
							className={styles.input}
							placeholder="name"
							value={guestData.name}
							onChange={handleChange}
							name="name"
						/>
					</div>

					<div className={styles.input_group}>
						<label>Email</label>
						<input
							type="email"
							className={styles.input}
							placeholder="email"
							value={guestData.email || ""}
							onChange={handleChange}
							name="email"
						/>
					</div>
					<div className={styles.input_group}>
						<label>Phone Number</label>
						<input
							type="text"
							className={styles.input}
							placeholder="phone number"
							value={guestData.phoneNumber || ""}
							onChange={handleChange}
							name="phoneNumber"
						/>
					</div>
					<div className={styles.input_group}>
						<label>Tag</label>
						<input
							type="text"
							className={styles.input}
							placeholder="tag"
							value={guestData.tag || ""}
							onChange={handleChange}
							name="tag"
						/>
					</div>
					<div className={styles.input_group}>
						<label>Invite Count</label>
						<input
							type="number"
							className={styles.input}
							placeholder="invite count"
							value={guestData.inviteCount || 1}
							onChange={handleChange}
							name="inviteCount"
						/>
					</div>
				</div>
				<Button
					className={styles.button_submit}
					onClick={handleSubmit}
					disabled={isLoading}
				>
					Submit {isLoading && <SmallLoader />}
				</Button>
			</div>
		</Modal>
	);
}
