import env from "custom-env";
import nodemailer from "nodemailer";

env.env();

class EmailSender {
  static async resetPassword(account) {
    const subject = "Your password has been changed";
    const text = `Hi ${account.username} \n 
                    This is a confirmation that the password for your account has just been changed.\n`;
    const mail = generateEmail(account.username, subject, text);

    await transport.sendMail(mail);
  }

  static async forgotPassword(req, account) {
    const host = req.headers.host;
    const token = account.resetPasswordToken;
    const link = `http://${host}/reset/password/${token}`;
    const text = `Hi ${account.username} \n  Please click on the following link ${link} 
      to reset your password. \n\n 
      If you did not request this, please ignore this email and your password will 
      remain unchanged.\n`;
    const subject = "Password change request";
    const mail = generateEmail(account.username, subject, text);

    await transport.sendMail(mail);
  }
}

const transport = nodemailer.createTransport({
  service: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PWD
  }
});

const generateEmail = (to, subject, text) => {
  const mail = {
    to: to,
    from: process.env.FROM_EMAIL,
    subject: subject,
    text: text
  };
  return mail;
};

export default EmailSender;
