import { NextRequest, NextResponse } from "next/server";
import { signup } from "@/lib/helpers/auth";

export async function POST(req: NextRequest) {
	try {
		const payload = await req.json();
		const admin = await signup(payload);
		return NextResponse.json(
			{ data: admin, success: true, message: "Signup successful!" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.status || 500 }
		);
	}
}
