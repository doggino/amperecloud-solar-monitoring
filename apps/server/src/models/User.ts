import { Schema, model } from 'mongoose';
import { Maybe, UserDbObject } from 'apps/__generated__/graphql';
import { hashSync, compareSync } from 'bcryptjs';
import { verify, JwtPayload } from 'jsonwebtoken';
import { jwtSecret } from '../config';

export interface IUser extends UserDbObject {
  password: string;
  checkPassword(candidatePassword: string): boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    set: (password: string) => hashSync(password, 10),
  },
});

userSchema.methods.checkPassword = function (candidatePassword: string) {
  console.log('compare', candidatePassword, this.password);

  return compareSync(candidatePassword, this.password);
};

const User = model<IUser>('User', userSchema);

export const getUserFromToken = async (
  token: string
): Promise<Maybe<IUser>> => {
  try {
    const payload = verify(token, jwtSecret) as JwtPayload;
    return await User.findById(payload.id);
  } catch (err) {
    return null;
  }
};

export default User;
