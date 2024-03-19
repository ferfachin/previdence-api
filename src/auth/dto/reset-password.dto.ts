import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: 'newPassword123!' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;

  @ApiProperty({ example: 'resetToken' })
  @IsNotEmpty()
  @IsString()
  token: string;
}
