import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'The email must be a valid email address' })
  email: string;

  @ApiProperty({ example: 'Abc123!' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'The password must contain at least one uppercase letter, one number, and one special character',
  })
  password: string;

  @ApiProperty({ example: 'username' })
  username: string;

  @ApiProperty({ example: 'user' })
  role: string;
}
