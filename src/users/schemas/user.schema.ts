import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  roles: [String],
  isVerified: { type: Boolean, default: false },
  username: String,
  password: String,
  salt: String,
  resetPasswordToken: String,
});
