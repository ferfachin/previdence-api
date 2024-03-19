import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User) {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body() user: User) {
    try {
      return await this.authService.login(user);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
