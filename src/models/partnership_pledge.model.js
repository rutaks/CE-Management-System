import mongoose from "mongoose";

const Schema = mongoose.Schema;

const partnershipPledgeSchema = new Schema({
  partnership: {
    type: Schema.Types.ObjectId,
    ref: "PartnershipArm",
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
  },
  recordedBy: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    enum: ["RWF", "USD"]
  },
  currencyRate: {
    type: Number
  }
});

export default mongoose.model("PartnershipPledge", partnershipPledgeSchema);
