import { getGuestInviteWithOtp } from "@/lib/helpers";
import OTPService from "@/lib/helpers/otp";
import { NextRequest, NextResponse } from "next/server";

const otpService = OTPService.getInstance();

export async function POST(req: NextRequest) {
	try {
		const payload = await req.json();
        if(!payload?.phoneNumber || !payload?.email) return NextResponse.json(
			{ error: "Phone number or email is required" },
			{ status: 200 }
		);

		const otp = otpService.create(payload?.phoneNumber || payload?.email);
        // send otp to email or phone number
		return NextResponse.json(
			{ success: true, message: "OTP confirmed!" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: error.status || 500 }
		);
	}
}
