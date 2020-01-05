import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: "Member"
  },
  memberFellowship: {
    type: String
  },
  memberGender: {
    type: String
  },
  memberDepartment: {
    type: String
  },
  attendedOn: {
    type: Date,
    default: Date.now
  }
});

attendanceSchema.index({ member: 1, attendedOn: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
