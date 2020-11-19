import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { createTransport, Transporter } from 'nodemailer';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class EmailService {
  private mailer: Transporter;

  constructor() {
    this.mailer = createTransport({
      service: 'gmail',
      auth: {
        user: 'Automated-Server@mrktpulse.com',
        pass: 'Vikings29',
      },
    });
  }

  public createConfirmationId(): string {
    return v4();
  }

  public async sendConfirmationEmail(recipient: string, url: string) {
    const mailOptions = {
      from: 'automated-server@mrktpulse.com',
      to: recipient,
      subject: 'Confirm Email',
      html: `<html>
        <body>
        <p>Welcome to the Market Pulse Client Portal, please confirm your email</p>
        <a href="${url}">Confirm Email</a>
        </body>
        </html>`,
    };
    this.mailer.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  public createConfirmPasswordUrl(url: string, id: string) {
    return `${url}/auth/confirm-password/${id}`;
  }

  //   public async changePassEmail(id: number) {
  //     const userId = await this.redis.getClient().get(id as any);

  //     if (userId) {
  //       await this.usersRepository.update(
  //         { id: userId as any },
  //         { confirmed: true },
  //       );
  //       await this.redis.getClient().del(id as any);
  //     } else {
  //       throw new HttpException('Invalid', HttpStatus.NOT_FOUND);
  //     }
  //   }

  //   public async changePassword(id: number, password: string) {
  //     const userId = await this.redis.getClient().get(id as any);

  //     if (userId) {
  //       const hash = await bcrypt.hash(password, 10);
  //       await this.usersRepository.update(
  //         { id: userId as any },
  //         { password: hash },
  //       );
  //       await this.redis.getClient().del(id as any);
  //     } else {
  //       throw new HttpException('Invalid', HttpStatus.NOT_FOUND);
  //     }
  //   }

  public async confirmPasswordReset(id: number) {
    // const userId = await redis.get(id);
    // redis.set(id, userId, "ex", 60 * 60 * 24);
    // const userId = await this.redis.getClient().get(id as any);
    // const usersRepository = getCustomRepository(UsersRepository);
  }
}
