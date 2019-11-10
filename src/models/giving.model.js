import mongoose from "mongoose";

const Schema = mongoose.Schema;

const givingSchema = new Schema({
  giving: {
    type: Schema.Types.ObjectId,
    ref: "GivingCategory",
    required: true
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  createOn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Giving", givingSchema);
