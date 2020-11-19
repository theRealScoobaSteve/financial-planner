import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  CACHE_MANAGER,
  Inject,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

/**
 * @todo fix this to have data types and be cleaner
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'myprivatekey',
    });
  }

  async validate(payload: any) {
    let user = await this.cacheManager.get(payload.sub.toString());

    if (!user) {
      user = await this.usersRepository.findOne(payload.sub);
      await this.cacheManager.set(payload.sub.toString(), user);
    }

    if (!user.confirmed) {
      throw new HttpException('User not confirmed', HttpStatus.NOT_FOUND);
    }

    // Jwt is built to look for the username on the payload
    // so payload.username is actually the email of the user
    return {
      userId: payload.sub,
      username: payload.username,
      is_admin: user.is_admin,
      is_confirmed: user.confirmed,
    };
  }
}
