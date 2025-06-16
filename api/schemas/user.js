import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchemas = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  career: String,
  password: String
});

export default userSchemas;