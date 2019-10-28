import mongoose from "mongoose";

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  gender: {
    type: String,
    enum: ["Male", "Female"]
  },
  phonenumber: {
    type: String
  },
  fellowshipId: {
    type: Schema.Types.ObjectId,
    ref: "Fellowship",
    required: true
  },
  createOn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Member", memberSchema);
