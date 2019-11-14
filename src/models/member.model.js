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
  email: {
    type: String
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
  fellowship: {
    type: Schema.Types.ObjectId,
    ref: "Fellowship"
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department"
  },
  createOn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Member", memberSchema);
