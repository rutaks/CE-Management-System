import moment from "moment";

class formatter {
  static getMomentCloudDate(date) {
    return date.utcOffset("+0700").format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  }
}

export default formatter;
