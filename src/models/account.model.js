import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  createOn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Account", accountSchema);
