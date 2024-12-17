import { NextRequest } from "next/server";
import { authMiddleware } from "./auth.middleware";

export async function middleware(req: NextRequest) {
	console.log("called....");
	
	authMiddleware(req);
}

export const config = {
	matcher: ["/api/admin/:path*"],
};
