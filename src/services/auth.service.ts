import { User } from '../models';
import { hashPassword, comparePassword } from '../utils/password';
import { signToken } from '../utils/jwt';

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const exists = await User.findOne({ where: { email: data.email } });
  if (exists) throw new Error('Email already exists');

  const user = await User.create({
    ...data,
    password: await hashPassword(data.password)
  });

  const token = signToken({ id: user.id });
  return { user, token };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = signToken({ id: user.id });
  return { user, token };
};
