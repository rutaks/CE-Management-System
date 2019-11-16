import moment from "moment";

class formatter {
  static getMomentCloudDate(date) {
    return date.utcOffset("+0700").format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  }
  static getMonthRange(...req) {
    let start = "";
    let end = "";
    if (req == 0) {
      start = formatter.getMomentCloudDate(moment().startOf("month"));
      end = formatter.getMomentCloudDate(moment().endOf("month"));
    } else {
      start = formatter.getMomentCloudDate(moment(req[0], "MM/DD/YYYY"));
      end = formatter.getMomentCloudDate(moment(req[1], "MM/DD/YYYY"));
    }

    return { start, end };
  }
}

export default formatter;
