import { NextRequest, NextResponse } from "next/server";
import { editGuest } from "@/lib/helpers";

export async function POST(req: NextRequest) {
	try {
		const guestId = req.nextUrl.searchParams.get("id");
		if (!guestId)
			return NextResponse.json(
				{ error: "Guest Id is missing in payload" },
				{ status: 400 }
			);
		const payload = await req.json();
		const guest = await editGuest(guestId, payload);
		return NextResponse.json(
			{ data: guest, success: true, message: "Guest added!" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.status || 500 }
		);
	}
}
