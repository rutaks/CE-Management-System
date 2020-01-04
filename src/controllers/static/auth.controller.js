import Member from "../../models/member.model";
import Account from "../../models/account.model";
import auth from "../../helpers/auth";
import bcrypt from "bcryptjs";
import env from "custom-env";
import crypto from "crypto";
import nodemailer from "nodemailer";

env.env();
class authController {
  static getForgotPasswordPage(req, res) {
    res.render("auth/forgot-password", { title: "Forgot Password" });
  }

  static async forgotPassword(req, res) {
    const { username } = req.body;
    try {
      const account = await Account.findOne({ username: username }).populate(
        "member"
      );
      if (!account) {
        return res.render("auth/forgot-password", {
          errorMessage: "No Email Found",
          oldInput: { username: username }
        });
      }
      const {
        resetPasswordToken,
        resetPasswordExpires
      } = generatePasswordReset();

      account.resetPasswordToken = resetPasswordToken;
      account.resetPasswordExpires = resetPasswordExpires;
      account.save();

      const host = req.headers.host;
      const token = account.resetPasswordToken;
      const link = `http://${host}/reset/password/${token}`;
      const text = `Hi ${account.username} \n  Please click on the following link ${link} 
      to reset your password. \n\n 
      If you did not request this, please ignore this email and your password will 
      remain unchanged.\n`;
      const subject = "Password change request";
      const mail = generateEmail(account.username, subject, text);

      transport.sendMail(mail);

      return res.render("auth/message-window", {
        title: "Email Sent",
        heading: "Email Succesfully sent",
        message: "Check you email to reset your password"
      });
    } catch (error) {
      console.log("ERR:", error);
      throw new ErrorHandler(500, error);
    }
  }

  static async resetPasswordPage(req, res) {
    const token = req.params.token;
    const account = await Account.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!account) {
      return res.render("auth/message-window", {
        title: "Account Not Found",
        heading: "No Account Was Found",
        message: "Check Again your email to reset your password"
      });
    }
    return res.render("auth/reset-password", { token: token });
  }

  static async resetPassword(req, res) {
    const token = req.params.token;
    const { password, password2 } = req.body;
    if (password !== password2) {
      return res.render("auth/reset-password", {
        errorMessage: "Passwords Do Not Match",
        token: token
      });
    }

    try {
      const account = await Account.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
      if (!account) {
        return res.render("auth/message-window", {
          title: "Account Not Found",
          heading: "Invalid Token",
          message: "Check your email to reset your password"
        });
      }
      const hashedPassword = bcrypt.hashSync(password, 12);
      account.password = hashedPassword;
      account.resetPasswordToken = undefined;
      account.resetPasswordExpires = undefined;
      account.save();
      const subject = "Your password has been changed";
      const text = `Hi ${account.username} \n 
                    This is a confirmation that the password for your account has just been changed.\n`;
      const mail = generateEmail(account.username, subject, text);

      transport.sendMail(mail);

      return res.render("auth/message-window", {
        title: "Password Changed",
        heading: "Password Has Been Changed Succesfully",
        message: `Head To The Login Page & Enter Your New Credentials`
      });
    } catch (error) {
      console.log("ERR:", error);
      next(error);
    }
  }

  static getLoginPage(req, res) {
    res.render("auth/login", { title: "Login" });
  }

  static getSignupPage(req, res) {
    Member.find().then(members =>
      res.render("auth/register", {
        title: "Register Account",
        members: members
      })
    );
  }

  static signup(req, res) {
    const { member, username, password, confirmPassword } = req.body;
    Account.findOne({ username: username })
      .then(userDoc => {
        if (userDoc) {
          req.flash("error", "Username is used by another user");
          return res.redirect("signup");
        }
        return bcrypt.hash(password, 12).then(hashedPassword => {
          const account = new Account({
            username: username,
            member: member,
            password: hashedPassword
          });
          return account.save();
        });
      })
      .then(result => {
        return res.redirect("/login");
      })
      .catch(err => console.log("ERR: Could not signup user, " + user));
  }

  static login(req, res) {
    const { username, password } = req.body;
    const account = auth.findAccount(username);
    account
      .then(acc => {
        if (auth.passwordIsValid(password, acc.password)) {
          req.session.isLoggedIn = true;
          req.session.account =
            acc.member.firstname + " " + acc.member.lastname;
          return res.redirect("/admin");
        } else {
          return res.render("auth/login", {
            errorMessage: "Invalid Username or Password",
            oldInput: { email: username }
          });
        }
      })
      .catch(error => {
        return res.render("auth/login", {
          errorMessage: "User Not Found",
          oldInput: { email: username }
        });
      });
  }

  static logout(req, res) {
    req.session.destroy(err => {
      res.redirect("/login");
    });
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

const generatePasswordReset = () => {
  const resetPasswordToken = crypto.randomBytes(20).toString("hex");
  const resetPasswordExpires = Date.now() + 3600000; //expires in an hour
  return { resetPasswordToken, resetPasswordExpires };
};

export default authController;
