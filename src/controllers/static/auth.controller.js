import Member from "../../models/member.model";
import Account from "../../models/account.model";
import auth from "../../helpers/auth";
import sendEmail from "../../helpers/email-sender";
import generator from "../../helpers/generator";
import bcrypt from "bcryptjs";
import env from "custom-env";

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
      } = await generator.generatePasswordReset();

      account.resetPasswordToken = resetPasswordToken;
      account.resetPasswordExpires = resetPasswordExpires;
      account.save();

      await sendEmail.forgotPassword(req, account);

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

      await sendEmail.resetPassword(account);

      return res.render("auth/message-window", {
        title: "Password Changed",
        heading: "Password Has Been Changed Succesfully",
        message: `Head To The Login Page & Enter Your New Credentials`
      });
    } catch (error) {
      console.log("ERR:", error);
      throw new ErrorHandler(500, error);
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

  static async signup(req, res) {
    const { member, username, password, confirmPassword } = req.body;
    const foundAccount = await Account.findOne({ username: username });
    try {
      if (foundAccount) {
        req.flash("error", "Username is used by another user");
        return res.redirect("/signup");
      }

      if (password !== confirmPassword) {
        req.flash("error", "Passwords Do not match");
        return res.redirect("/signup");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const account = new Account({
        username: username,
        member: member,
        password: hashedPassword
      });
      await account.save();
      return res.redirect("/login");
    } catch (error) {
      console.log("ERR:", error);
      throw new ErrorHandler(500, error);
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    const account = await auth.findAccount(username);
    try {
      if (!auth.passwordIsValid(password, account.password)) {
        return res.render("auth/login", {
          errorMessage: "Invalid Username or Password",
          oldInput: { email: username }
        });
      }
      req.session.isLoggedIn = true;
      req.session.account = `${account.member.firstname} ${account.member.lastname}`;
      return res.redirect("/admin");
    } catch (error) {
      res.render("auth/login", {
        errorMessage: "User Not Found",
        oldInput: { email: username }
      });
    }
  }

  static logout(req, res) {
    req.session.destroy(err => {
      res.redirect("/login");
    });
  }
}

export default authController;
