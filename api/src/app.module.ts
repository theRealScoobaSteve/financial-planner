import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { Module, CacheModule } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.strategy';
import { PlaidService } from './services/plaid.service';
import { EmailService } from './services/email.service';
import { LocalStrategy } from './services/local.strategy';
import { AccountResolver } from './resolvers/account.resolver';
import { AuthenticationController } from './controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: process.env.POSTGRE_PASSWORD,
        database: process.env.DATABASE,
        migrationsTableName: 'migration_table',
        entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*.ts'],
        subscribers: [__dirname + '/subscribers/**/*.ts'],
        cli: {
          entitiesDir: '/entitys',
          migrationsDir: '/migrations',
          subscribersDir: '/subscribers',
        },
        synchronize: true,
      }),
    }),
    CacheModule.register(),
    PassportModule,
    JwtModule.register({
      secret: 'myprivatekey',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthenticationController],
  providers: [
    PlaidService, 
    AccountResolver,
    AuthService, 
    EmailService, 
    LocalStrategy, 
    JwtStrategy
  ],
})
export class AppModule {}
