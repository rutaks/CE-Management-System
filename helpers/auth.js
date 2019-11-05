import Account from "../models/account.model";
import bcrypt from "bcryptjs";
class auth {
  static findAccount(username, password) {
    return Account.findOne({ username: username }).populate("member");
  }

  static passwordIsValid(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
}

export default auth;
