import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty({
    message: 'Username must be not empty',
  })
  @MinLength(2, {
    message: 'Username is too short',
  })
  username: string;

  @Column()
  @IsNotEmpty({
    message: 'Password must be not empty',
  })
  @MinLength(8, {
    message: 'Password is too week',
  })
  password: string;

  @Column({ default: null })
  @IsEmail({ message: 'Check if email is correct' })
  email: string;

  @Column({ default: null })
  @Length(9, 12, { message: 'Check phone number for correctness' })
  phone: string;
}
