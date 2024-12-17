import { getGuest, getGuestById } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		console.log(req.nextUrl.searchParams.get("id"), "asdfgjkslas");
		const guestId = req.nextUrl.searchParams.get("id")
		if(!guestId) return NextResponse.json(
			{ error: 'GuestId missing in request' },
			{ status:  400 }
		)

		const guests = await getGuestById(guestId);
		return NextResponse.json(
			{ data: guests, success: true, message: "Guests retrieved!" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.status || 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const payload = await req.json();
		const guest = await getGuest(payload);
		return NextResponse.json(
			{ data: guest, success: true, message: "Guest confirmed!" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.status || 500 }
		);
	}
}
