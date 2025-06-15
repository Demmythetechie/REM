import userSchemas from "../schemas/user.js";
import mongoose from "mongoose";

const userModels = mongoose.model('users', userSchemas);
export default userModels;