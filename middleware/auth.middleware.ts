import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/helpers/auth";

export async function authMiddleware(req: NextRequest) {
	if (
		req.nextUrl.pathname.startsWith("/api/admin") &&
		req.nextUrl.pathname.includes("/api/admin/auth")
	) {
		return NextResponse.next();
	}

	const auth_header = req.headers.get("Authorization");
	if (!auth_header)
		return NextResponse.json(
			{ error: "No bearer token provided in Authorization header" },
			{ status: 400 }
		);

	const token = auth_header.split(" ")?.[1];
	if (!token) {
		return NextResponse.json(
			{ error: "No bearer token provided in Authorization header" },
			{ status: 400 }
		);
	}

	try {
		const decoded: any = jwt.verify(token, JWT_SECRET);
		(req as any).userId = decoded?.id;
		(req as any).authToken = token;
		return NextResponse.next();
	} catch (error) {
		return NextResponse.json(
			{ error: "Invalid token" },
			{ status: 400 }
		);
	}
}

export const config = {
	matcher: ["/api/admin/:path*"],
};
