import { userSchemas } from "../schemas/user";
import { Model } from "mongoose";

const userModels = new Model('userModel', userSchemas);
export default userModels;