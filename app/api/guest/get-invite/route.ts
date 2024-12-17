import { exportList, getGuestInviteWithOtp } from "@/lib/helpers";
import OTPService from "@/lib/helpers/otp";
import { NextRequest, NextResponse } from "next/server";

const otpService = OTPService.getInstance();

export async function GET(req: NextRequest) {
	try {
		const guests = await exportList();
		return NextResponse.json(
			{ data: guests, success: true, message: "Guests list" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.status || 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const payload = await req.json();
		const isValidOtp = otpService.validate(payload?.phoneNumber || payload?.email, payload.otp)
		const guest = await getGuestInviteWithOtp({...payload, otp: undefined});
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
