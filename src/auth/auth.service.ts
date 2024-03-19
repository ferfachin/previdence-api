import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as crypto from 'crypto'; // Importe o módulo crypto

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const existingUserName = await this.userRepository.findOne({
      where: { username: registerDto.username },
    });

    const existingEmail = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUserName) {
      throw new UnauthorizedException('Email or username already in use.');
    }

    if (existingEmail) {
      throw new UnauthorizedException('Email or username already in use.');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    newUser.role = registerDto.role || 'user';
    return this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const userFound = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (
      !userFound ||
      !(await bcrypt.compare(loginDto.password, userFound.password))
    ) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = { username: userFound.email, sub: userFound.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found.');
    }

    const currentTime = Date.now();
    if (user.resetTokenTimestamp) {
      const timeDifference = currentTime - user.resetTokenTimestamp;
      const minutesPassed = timeDifference / (1000 * 60);
      if (minutesPassed < 10) {
        throw new BadRequestException(
          'Please wait at least 10 minutes before requesting another password reset.',
        );
      }
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenTimestamp = currentTime;
    await this.userRepository.save(user);

    return `
      <p>Dear User,</p>
      <p>Please click the following link to reset your password:</p>
      <p><a href="http://example.com/reset-password?token=${token}">Reset Password</a></p>
      <p>If you didn't request this, please ignore this email.</p>
    `;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { resetToken: token },
    });
    if (!user) {
      throw new BadRequestException('Invalid token.');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    await this.userRepository.save(user);
  }
}
