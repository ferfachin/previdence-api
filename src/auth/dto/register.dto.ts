import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'strongPassword' })
  password: string;

  @ApiProperty({ example: 'username' })
  username: string;
}
