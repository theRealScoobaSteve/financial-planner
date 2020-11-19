import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PlaidService } from './services/plaid.service';
import { AccountResolver } from './resolvers/account.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
  ],
  controllers: [],
  providers: [PlaidService, AccountResolver],
})
export class AppModule {}
