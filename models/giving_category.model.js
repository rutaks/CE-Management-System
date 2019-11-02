import mongoose from "mongoose";

const Schema = mongoose.Schema;

const givingCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("GivingCategory", givingCategorySchema);
