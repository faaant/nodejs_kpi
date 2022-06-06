import {
  IsEmail,
  IsNotEmpty,
  Length,
  MinLength,
  IsMobilePhone,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty({
    message: 'ID must be not empty',
  })
  id?: string;

  @IsNotEmpty({
    message: 'Username must be not empty',
  })
  @MinLength(2, {
    message: 'Username is too short',
  })
  username?: string;

  @IsNotEmpty({
    message: 'Password must be not empty',
  })
  @MinLength(8, {
    message: 'Password is too week',
  })
  password?: string;

  @IsEmail({ message: 'Check if email is correct' })
  email?: string;

  @IsMobilePhone('any', { message: 'Check phone number for correctness ' })
  @Length(9, 12, { message: 'Check phone number for correctness' })
  phone?: string;
}
