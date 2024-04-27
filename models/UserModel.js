import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  lastName: { type: String, default: "lastName" },
  email: String,
  password: String,
});
export default mongoose.model("User", UserSchema);
