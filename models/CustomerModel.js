import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: String,
  lastName: { type: String, default: "lastName" },
  description: String,
  projects: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
});

export default mongoose.model("Customer", CustomerSchema);
