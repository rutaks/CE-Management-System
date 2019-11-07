import moment from "moment";

class formatter {
  static getMomentCloudDate(date) {
    return date.utcOffset("+0700").format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  }
  static getCurrentMonthRange() {
    const start = formatter.getMomentCloudDate(moment().startOf("month"));
    const end = formatter.getMomentCloudDate(moment().endOf("month"));
    return { start, end };
  }
}

export default formatter;
