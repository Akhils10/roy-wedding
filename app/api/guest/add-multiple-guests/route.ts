import { NextRequest, NextResponse } from "next/server";
import { addMultipleGuests } from "@/lib/helpers";

export async function POST(req: NextRequest) {
	try {
		const payload = await req.json();
		
		const response = await addMultipleGuests(payload);
		return NextResponse.json(
			{ data: response, success: true, message: "Guest list has been updated!" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: error.status || 500 });
	}
}
