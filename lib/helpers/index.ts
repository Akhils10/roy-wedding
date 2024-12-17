import { Guest, GuestType } from "@prisma/client";
import { GuestPayload, GuestUnionType, SearchGuestPayload } from "./types";
import { prismaClient } from "../prisma/client";
import { isEmpty, isNil, omit, omitBy, pick } from "lodash";
import HttpException from "./HttpException";
import { capitalize } from "@/utils";

export async function getGuestList(): Promise<GuestUnionType[]> {
	try {
		const guests = await prismaClient.guest.findMany({
			orderBy: {
				createdAt: "asc",
			},
			include: {
				group: true,
				staff: true,
			},
		});

		return guests;
	} catch (error) {
		return [];
	}
}

export async function exportList(){
	const guests = await prismaClient.guest.findMany({
		orderBy: {
			name: 'asc'
		},
		include: {
			group: true,
		},
	})

	const mappedList = guests.map((guest, index) => {
		const inviteCount = guest.guestType === 'REGULAR' ? 1 : guest.group?.inviteCount
		return {
			id: index + 1,
			name: capitalize(guest.name),
			guestType: guest.guestType === 'REGULAR' ? 'INDIVIDUAL' : 'GROUP',
			inviteCount,
			tag: guest.tag?.replace(',', ' ').toUpperCase()
		}
	})

	return mappedList
}

export async function searchGuest(query: string): Promise<GuestUnionType[]> {
	try {
		const guests = await prismaClient.guest.findMany({
			where: {
				OR: [
					{
						AND: getNames(query).map(word => ({
							name: { contains: word, mode: "insensitive" },
						})),
					},
					{ email: query?.toLowerCase() },
					{ phoneNumber: query?.toLowerCase() },
					{
						group: {
							name: { contains: query, mode: "insensitive" },
						},
						staff: {
							name: { contains: query, mode: "insensitive" },
						},
					},
				],
			},
			include: {
				group: true,
				staff: true,
			},
		});

		return guests;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function getGuest(
	payload: SearchGuestPayload
): Promise<GuestUnionType[] | null> {
	try {
		const formattedPayload = sanitize(omitBy(payload, isNil));
		if (isEmpty(formattedPayload))
			throw new Error("Please provide either email, phone number or full name");

		if (formattedPayload.email || formattedPayload.phoneNumber) {
			const guest = await prismaClient.guest.findFirst({
				where: {
					OR: [formattedPayload],
				},
				include: {
					group: true,
					staff: true,
				},
			});

			if (guest) return [guest];

			return null;
		} else if (formattedPayload.name) {
			const guests = await searchGuest(formattedPayload.name);
			if (guests?.length > 0) return guests;
			return null;
		}
		return null;
	} catch (error) {
		return null;
	}
}

export async function getGuestById(guestId: string): Promise<GuestUnionType | null> {
	try {
		const formattedPayload = sanitize(guestId);
		if (isEmpty(formattedPayload))
			throw new Error("Please provide either email, phone number or full name");

		if (!formattedPayload) throw new HttpException(404, "Guest with Id not found");
		const guest = await prismaClient.guest.findFirst({
			where: {
				id: formattedPayload,
			},
			include: {
				group: true,
				staff: true,
			},
		});

		return guest;
	} catch (error: any) {
		throw new HttpException(error.status, error.message);
	}
}

export async function getGuestInviteWithOtp(payload: {
	email: string | null;
	phoneNumber: string | null;
}): Promise<GuestUnionType | null> {
	try {
		const formattedPayload = sanitize(omitBy(payload, isNil));
		if (isEmpty(formattedPayload))
			throw new HttpException(400, "Please provide either email, phone number");
		if (!formattedPayload.email && !formattedPayload.phoneNumber)
			throw new HttpException(400, "Please provide either email, phone number");

		const guest = await prismaClient.guest.findFirst({
			where: {
				OR: [formattedPayload],
			},
			include: {
				group: true,
				staff: true,
			},
		});

		return guest;
	} catch (error: any) {
		console.log(error, "we");

		throw new HttpException(error.status, error.message);
	}
}

export async function addGuest(payload: GuestPayload) {
	try {
		const guestExist = await getGuest(
			pick(payload, ["name", "email", "phoneNumber"])
		);
		if (guestExist)
			throw new HttpException(409, "A guest with provided details already exist.");
		const formattedPayload = sanitize(omitBy(payload, isNil), [
			"guestType",
			"tag",
		]) as GuestPayload;

		const guestType = (formattedPayload.guestType?.toUpperCase() ||
			"REGULAR") as GuestType;
		if (guestType === "REGULAR") {
			return await prismaClient.guest.create({
				data: {
					...formattedPayload,
					guestType: (formattedPayload.guestType?.toUpperCase() ||
						"REGULAR") as GuestType,
				},
			});
		} else {
			const type = guestType.toLowerCase() as "group" | "staff";
			let guest: any;
			switch (type) {
				case "group":
					const group = await prismaClient.group.create({
						data: {
							name: formattedPayload.name,
							inviteCount: formattedPayload.inviteCount || 1,
						},
					});
					guest = await prismaClient.guest.create({
						data: {
							...omit(formattedPayload, ["inviteCount"]),
							guestType: (formattedPayload.guestType?.toUpperCase() ||
								"REGULAR") as GuestType,
							groupId: group.id,
						},
					});
					break;
				case "staff":
					const staff = await prismaClient.staff.create({
						data: {
							name: formattedPayload.name,
							inviteCount: formattedPayload.inviteCount || 1,
						},
					});
					guest = await prismaClient.guest.create({
						data: {
							...omit(formattedPayload, ["inviteCount"]),
							guestType: (formattedPayload.guestType?.toUpperCase() ||
								"REGULAR") as GuestType,
							staffId: staff.id,
						},
					});
			}

			return guest;
		}
	} catch (error: any) {
		throw new HttpException(error.status, error.message);
	}
}

export async function addMultipleGuests(payload: GuestPayload[]) {
	try {
		const preparedPayload: GuestPayload[] = [];
		const addedGuests: any[] = [];
		const invalidPayload: { guest: GuestPayload; error: string }[] = [];

		for (const guest of payload) {
			// let guestExist: Guest[] | null = null;
			// try {
			// 	guestExist = await getGuest(
			// 		pick(guest, ["name", "email", "phoneNumber"])
			// 	);
			// } catch (error: any) {
			// 	invalidPayload.push({
			// 		guest,
			// 		error: error.message || "invalid guest lookup parameters",
			// 	});
			// 	continue;
			// }

			// if (guestExist) {
			// 	invalidPayload.push({
			// 		guest,
			// 		error: "A guest with the same details already exist",
			// 	});
			// 	continue;
			// }

			// const formattedPayload = sanitize(
			// 	omitBy(
			// 		{
			// 			...guest,
			// 			guestType: guest.guestType?.toUpperCase() || "REGULAR",
			// 		},
			// 		isNil
			// 	),
			// 	["guestType", "tag"]
			// ) as GuestPayload;
			// preparedPayload.push(formattedPayload);

			try {
				const addedGuest = await addGuest(guest);
				addedGuests.push({
					name: addedGuest?.name,
					inviteCount: guest.inviteCount || 1,
				});
			} catch (error: any) {
				invalidPayload.push({
					guest,
					error: error.message || "invalid guest lookup parameters",
				});
			}
		}

		// if (!preparedPayload.length)
		// 	throw new HttpException(400, "No new guest were registered!");
		// const guests = await prismaClient.guest.createMany({
		// 	data: preparedPayload,
		// });

		return {
			addedGuests,
			invalid: invalidPayload,
		};
	} catch (error: any) {
		throw new HttpException(error.status, error.message);
	}
}

export async function checkReservation(payload: SearchGuestPayload) {
	try {
		const guestExist = await getGuest(
			pick(payload, ["name", "email", "phoneNumber"])
		);

		if (!guestExist)
			throw new HttpException(404, "Couldn't find guest with the provided info");
		if (guestExist.length > 1) {
			return await checkReservation({
				name: null,
				email: payload.email,
				phoneNumber: payload.phoneNumber,
			});
		}
		if (guestExist.length === 1) {
			const [guest] = guestExist;
			if (guest.rsvp) return guest;
			await prismaClient.guest.update({
				data: {
					rsvp: true,
				},
				where: {
					id: guest.id,
				},
			});
			guest.rsvp = true;
			return guest;
		}
	} catch (error: any) {
		console.log(error);

		throw new HttpException(error.status, error.message);
	}
}

export async function admitGuest(guestId: string, admitCount?: number) {
	try {
		const guest = await getGuestById(guestId);

		if (!guest) throw new HttpException(404, "Guest with Id not found");

		// if (!guest.rsvp)
		// 	throw new HttpException(400, "Guest did not confirm reservation");
		if (guest.guestType === "REGULAR") {
			await prismaClient.guest.update({
				data: {
					isAdmitted: true,
				},
				where: {
					id: guest.id,
				},
			});

			return true;
		} else {
			const guestType = guest.guestType.toLowerCase() as "group" | "staff";
			if (guest[guestType]?.admittedCount! >= guest[guestType]?.inviteCount!)
				throw new HttpException(
					400,
					`Maximum ${capitalize(guestType)} invites have been admitted!`
				);
			const key = guestType === "group" ? "groupId" : "staffId";
			switch (guestType) {
				case "group":
					await prismaClient.group.update({
						data: {
							admittedCount:
								guest[guestType]?.admittedCount! + (admitCount || 1),
						},
						where: {
							id: guest.groupId!,
						},
					});
					break;
				case "staff":
					await prismaClient.staff.update({
						data: {
							admittedCount:
								guest[guestType]?.admittedCount! + (admitCount || 1),
						},
						where: {
							id: guest[key]!,
						},
					});
			}
			return true;
		}
	} catch (error: any) {
		console.log(error);
		throw new HttpException(error.status, error.message);
	}
}

export async function editGuest(guestId: string, payload: any) {
	try {
		const guest = await getGuestById(guestId);
		if (!guest) throw new HttpException(404, "Guest with Id not found");
		const formattedPayload = sanitize(
			omitBy(
				{ ...payload, guestType: guest.guestType?.toUpperCase() || "REGULAR" },
				isEmpty
			),
			["guestType", "tag"]
		);
		if (isEmpty(formattedPayload))
			throw new Error("Please provide data to update to");

		if (guest.guestType === "REGULAR") {
			await prismaClient.guest.update({
				data: {
					...omit(formattedPayload, ["inviteCount"])
				},
				where: {
					id: guest.id,
				},
			});

			return true;
		} else {
			const guestType = guest.guestType.toLowerCase() as "group" | "staff";
			if (guest[guestType]?.admittedCount! >= guest[guestType]?.inviteCount!)
				throw new HttpException(
					400,
					`Maximum ${capitalize(guestType)} invites have been admitted!`
				);
			const key = guestType === "group" ? "groupId" : "staffId";
			switch (guestType) {
				case "group":
					await prismaClient.group.update({
						data: {
							name: formattedPayload.name,
							inviteCount: +(formattedPayload.inviteCount || 1),
						},
						where: {
							id: guest.groupId!,
						},
					});
					break;
				case "staff":
					await prismaClient.staff.update({
						data: {
							name: formattedPayload.name,
							inviteCount: +(formattedPayload.inviteCount || 1),
						},
						where: {
							id: guest[key]!,
						},
					});
			}
			await prismaClient.guest.update({
				data: {
					...omit(formattedPayload, ["inviteCount"]),
				},
				where: {
					id: guest.id,
				},
			});
			return true;
		}
	} catch (error: any) {
		console.log(error);
		throw new HttpException(error.status, error.message);
	}
}

export function sanitize<T>(input: T, excludeKeys: string[] = []): T {
	if (typeof input === "string") {
		return input.toLowerCase().trim() as T;
	} else if (typeof input === "object" && input !== null) {
		const sanitizedObject: any = {};
		for (const key in input) {
			if (input.hasOwnProperty(key)) {
				sanitizedObject[key] = excludeKeys.includes(key)
					? input[key]
					: sanitize(input[key], excludeKeys);
			}
		}
		return sanitizedObject;
	}
	return input;
}

function getNames(fullname: string) {
	return fullname
		.trim()
		.split(" ")
		.filter(name => name.length > 0);
}