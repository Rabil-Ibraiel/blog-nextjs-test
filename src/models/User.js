import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    uniqe: true,
  },
  email: {
    type: String,
    required: true,
    uniqe: true,
  },
  password: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
