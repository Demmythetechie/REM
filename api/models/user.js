import userSchemas from "../schemas/user.js";
import { Model } from "mongoose";

const userModels = new Model('userModel', userSchemas);
export default userModels;