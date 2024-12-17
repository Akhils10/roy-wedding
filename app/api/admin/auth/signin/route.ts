import { NextRequest, NextResponse } from "next/server";
import { signin } from "@/lib/helpers/auth";
import omit from "lodash/omit";

export async function POST(req: NextRequest) {
	try {
		const payload = await req.json();
		const admin = await signin(payload);
		const response = NextResponse.next();
		const token = admin.token?.toString() || ""
		if(admin){
			response.cookies.set("auth_token", token);
		}
		return NextResponse.json(
			{
				data: omit(admin, "password"),
				success: true,
				message: "Signin successful!",
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.status || 500 }
		);
	}
}
