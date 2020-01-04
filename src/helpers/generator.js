import crypto from "crypto";

class Generator {
  static async generatePasswordReset() {
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000; //expires in an hour
    return { resetPasswordToken, resetPasswordExpires };
  }
}

export default Generator;
