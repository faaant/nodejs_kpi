import { UserDto } from '@users/dto';

export function createUserObject(user: UserDto, updatedUser: UserDto = user) {
  updatedUser.username = user?.username ?? updatedUser.username;
  updatedUser.password = user?.password ?? updatedUser.password;
  updatedUser.email = user?.email ?? updatedUser.email;
  updatedUser.phone = user?.phone ?? updatedUser.phone;
  return updatedUser;
}
