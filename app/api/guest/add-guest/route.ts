import { NextRequest, NextResponse } from "next/server";
import { addGuest } from "@/lib/helpers";

export async function POST(req: NextRequest) {
	try {
		const payload = await req.json();
		const guest = await addGuest(payload);
		return NextResponse.json(
			{ data: guest, success: true, message: "Guest added!" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: error.status || 500 });
	}
}
