import userSchemas from "../schemas/user.js";
import mongoose from "mongoose";

const userModels = mongoose.model('userModel', userSchemas);
export default userModels;