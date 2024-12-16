import mongoose, { model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';

export const userSchema = new mongoose.Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
      // select: false,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error: any) {
      return next(error);
    }
  } else {
    next();
  }
});

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  const result = await this.findOne({ id });
  return !!result;
};
userSchema.statics.isDeleted = async function (id: string) {
  const user = await this.findOne({ id });
  return user?.isDeleted;
};
userSchema.statics.isBlocked = async function (id: string) {
  const user = await this.findOne({ id });
  return user?.status === 'blocked';
};

userSchema.statics.isPasswordMatch = async function (
  id: string,
  password: string,
) {
  const user = await this.findOne({ id });
  const result = await bcrypt.compare(password, user?.password as string);
  return result;
};

export const User = model<TUser, UserModel>('User', userSchema);
