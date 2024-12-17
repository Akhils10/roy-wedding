import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/helpers/auth";

export async function POST(req: NextRequest) {
	try {
		const payload = await req.json();
		const admin = await authenticate(payload.token);
		return NextResponse.json(
			{ data: admin, success: true, message: "Authentication successful!" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.status || 500 }
		);
	}
}
