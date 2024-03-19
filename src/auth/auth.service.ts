import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

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
}
