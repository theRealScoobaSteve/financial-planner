import {
  Get,
  Post,
  Controller,
  Req,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Param,
  Redirect,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../entitys/user.entity';
import { AuthService } from '../services/auth.service';
import { HttpResponse } from '../utilities/http-response';
import { EmailService } from '../services/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin.guard';
import { Cache } from 'cache-manager';

export class NewAccountData {
  readonly first_name: string;
  readonly last_name: string;
  readonly password: string;
  readonly email: string;
}

export class LoginData {
  readonly username: string;
  readonly password: string;
}

@Controller('auth')
export class AuthenticationController {
  /**
   * @param authService
   * @param emailService
   */
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  /**
   * Registers a new user
   * @param accountData: NewAccountData
   * @throws HttpException
   * @returns Promise<HttpResponse>
   */
  @Post('register')
  async register(@Body() accountData: NewAccountData, @Req() req) {
    const { first_name, last_name, password, email } = accountData;
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new HttpException('This user already exists', HttpStatus.CONFLICT);
    } else {
      const hash = await this.authService.hashPassword(password);

      const user = await this.usersRepository.create({
        email,
        password: hash,
        first_name,
        last_name,
      });

      await this.usersRepository.save(user);

      const id = this.emailService.createConfirmationId();

      await this.cacheManager.set(id, user.uuid, {
        ttl: 60 * 60 * 24,
      });

      const url = this.emailService.createConfirmPasswordUrl(
        req.protocol + '://' + req.get('host'),
        id,
      );

      await this.emailService.sendConfirmationEmail(user.email, url);

      return new HttpResponse(true, 'Account Created, Email Sent');
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginData: LoginData, @Req() req) {
    // The username is the email address of the user
    const { username, password } = loginData;

    const user = await this.authService.validateUser(username, password);

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req) {
    req.logout();
    return new HttpResponse(true, 'Successfully logged out');
  }

  // @Get('/account-confirmation/generate/:userId')
  // @CacheKey('confirmation_email_id')
  // @CacheTTL(60 * 60 * 24)
  // @UseInterceptors(CacheInterceptor)
  // async generateConfirmation(@Param() params, @Req() req) {
  //   const uuid = this.emailService.createConfirmationId();
  //   const id = params.userId;
  //   const url =
  //     req.protocol + '://' + req.get('host') + `/auth/confirm/${uuid}`;
  //   const user = await this.usersRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });

  //   await this.emailService.sendEmail(user.email, url);

  //   await this.cacheManager.set('confirmation_email_id', uuid);
  //   console.log(await this.cacheManager.get('confirmation_email_id'));

  //   return new HttpResponse(true, 'User Created');
  // }

  @Get('/confirm-password/:id')
  @Redirect('/auth/login')
  async confirmAccount(@Param() params, @Req() req) {
    const { id } = params;
    const uuid = await this.cacheManager.get(id);

    const user = await this.usersRepository.findOne({
      where: {
        uuid,
      },
    });

    if (user && user.confirmed) {
      throw new HttpException('User Already Confirmed', HttpStatus.CONFLICT);
    }

    if (user) {
      await this.usersRepository.update({ id: user.id }, { confirmed: true });
      await this.cacheManager.del(id);

      return { url: req.protocol + '://' + req.get('host') + '/auth/login' };
    }

    throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
  }
}
