import Account from "../../models/account.model";
import bcrypt from "bcryptjs";
import memberController from "./member.controller";
import Member from "../../models/member.model";

class authController {
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
    Account.findOne({ username: username })
      .populate("member")
      .then(account => {
        if (!account) {
          return res.redirect("/login");
        }
        bcrypt.compare(password, account.password).then(matches => {
          if (matches) {
            req.session.isLoggedIn = true;
            req.session.account = account.username;
            return res.redirect("/admin");
          }
          return res.redirect("/login");
          //   req.flash("error", "Invalid email or password");
        });
      })
      .catch(err => {
        console.log("ERR: Could Not Login, " + err);
      });
  }

  static logout(req, res) {
    req.session.destroy(err => {
      res.redirect("/login");
    });
  }
}

export default authController;
