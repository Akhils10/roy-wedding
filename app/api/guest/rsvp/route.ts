import { NextRequest, NextResponse } from "next/server";
import { checkReservation } from "@/lib/helpers";

export async function POST(req: NextRequest) {
	try {
		const payload = await req.json();
		const guest = await checkReservation(payload);

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
