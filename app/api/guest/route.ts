import { getGuest, getGuestList } from "@/lib/helpers";
import { isEmpty } from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const guests = await getGuestList();
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
