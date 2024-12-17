interface OTPEntry {
	otp: string;
	expiration: Date;
}

class OTPService {
    private static instance: OTPService;
    private otpStore: Map<string, OTPEntry> = new Map();
  
    private constructor() {}
  
    // Method to get the single instance of the class
    public static getInstance(): OTPService {
      if (!OTPService.instance) {
        OTPService.instance = new OTPService();
      }
      return OTPService.instance;
    }
  
    generateOTP(length = 6): string {
      const digits = '0123456789';
      let otp = '';
      for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
      return otp;
    }
  
    create(phoneNumber: string): string {
      const otp = this.generateOTP();
      const expiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
  
      this.otpStore.set(phoneNumber, { otp, expiration });
  
      return otp;
    }
  
    validate(phoneNumber: string, otp: string): boolean {
      const entry = this.otpStore.get(phoneNumber);
  
      if (!entry) {
        return false;
      }
  
      const { otp: storedOTP, expiration } = entry;
  
      if (storedOTP === otp && expiration > new Date()) {
        this.otpStore.delete(phoneNumber); // Delete after validation
        return true;
      }
  
      return false;
    }
  
    removeExpiredOTPs() {
		const now = new Date();
		this.otpStore.forEach((entry, phoneNumber) => {
			if (entry.expiration <= now) this.otpStore.delete(phoneNumber);
		});
	}
  }
  
  export default OTPService;
  