import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async login(user: User): Promise<{ access_token: string }> {
    const userFound = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!userFound) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const isPasswordMatching = await bcrypt.compare(
      user.password,
      userFound.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    if (
      userFound &&
      (await bcrypt.compare(user.password, userFound.password))
    ) {
      const payload = { username: userFound.email, sub: userFound.id };

      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    return null;
  }
}
