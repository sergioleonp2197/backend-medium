import bcrypt from 'bcrypt';

export const hashPassword = (plain: string) =>
  bcrypt.hash(plain, 10);

export const comparePassword = (plain: string, hash: string) =>
  bcrypt.compare(plain, hash);
