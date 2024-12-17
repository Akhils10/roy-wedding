import { NextRequest, NextResponse } from "next/server";
import { admitGuest } from "@/lib/helpers";

export async function POST(req: NextRequest) {
	try {
		const { id, admitCount } = await req.json();
		if (!id)
			return NextResponse.json(
				{ error: `'id' is required in request body` },
				{ status: 400 }
			);
		await admitGuest(id, admitCount);
		return NextResponse.json(
			{ success: true, message: "Guest confirmed!" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.status || 500 }
		);
	}
}
