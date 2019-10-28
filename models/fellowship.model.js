import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fellowshipSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Fellowship", fellowshipSchema);
