import { User } from '@users/user.entity';

export function createUserObject(user: User, updatedUser: User = user) {
  updatedUser.username = user?.username ?? updatedUser.username;
  updatedUser.password = user?.password ?? updatedUser.password;
  updatedUser.email = user?.email ?? updatedUser.email;
  updatedUser.phone = user?.phone ?? updatedUser.phone;
  return updatedUser;
}
