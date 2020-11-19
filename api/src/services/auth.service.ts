import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  /**
   * @todo
   * This needs to be re-written with bcrypt
   *
   * @param email
   * @param password
   */
  async validateUser(email: string, password: string): Promise<any> {
    // const user = await this.usersRepository.findUserByEmail(email);
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        'Your email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException(
        'Your email or password is not valid',
        HttpStatus.NOT_FOUND,
      );
    }
    
    if (!user.confirmed) {
      throw new HttpException(
        'Your account has not been confirmed',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async hashPassword(password: string): Promise<any> {
    return await bcrypt.hash(password, 10);
  }

  async login(user: any) {
    // get the private key from the config file -> environment variable
    const payload = { username: user.email, sub: user.id };
    user.password = null;
    return { access_token: this.jwtService.sign(payload), ...user };
  }
}
