//MODELS
import Attendance from "../../models/attendance.model";
import Member from "../../models/member.model";
//HELPERS
import format from "../../helpers/formatters";
import calculate from "../../helpers/calculator";
import ErrorHandler from "../../helpers/error-handler";
import Responses from "../../helpers/responses";
//DEPENDENCIES
import moment from "moment";

class AttendanceController {
  static async addToAttendance(req, res) {
    const { memberId } = req.params;
    const { start, end } = format.getTodayRange();

    try {
      const foundAttendance = await Attendance.findOne({
        member: memberId,
        attendedOn: { $gte: start, $lt: end }
      });
      if (foundAttendance) {
        return Responses.send409(res, "Member Already In Today's Attendance");
      }
      const foundMember = await Member.findById(memberId);
      if (!foundMember) {
        return Responses.send404(res, "No Member Found");
      }
      const attendance = new Attendance({
        member: foundMember._id
      });
      await attendance.save();
      return Responses.send201(res, "Member Successfully Created", {
        attendance: attendance
      });
    } catch (error) {
      console.log(error);
      throw new ErrorHandler(500, error);
    }
  }

  static async getAttendance(req, res) {
    const { start, end } = format.getTodayRange();
    const foundAttendance = await Attendance.find({
      attendedOn: { $gte: start, $lt: end }
    }).populate("member");
    const totalAttendance = calculate.findTotalAttendance(foundAttendance);
    return Responses.send201(res, "Attendance Successfully Found", {
      totalAttendance: totalAttendance,
      attendance: foundAttendance
    });
  }
}

export default AttendanceController;
