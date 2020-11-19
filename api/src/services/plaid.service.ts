import plaid, { Client } from "plaid";
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlaidService {
    private plaidClient : any;

    public constructor(private configService: ConfigService){
        this.plaidClient = new Client({
            clientID: this.configService.get<string>('PLAID_CLIENT_ID'),
            secret: this.configService.get<string>('PLAID_DEVELOPMENT_ID'),
            env: plaid.environments.development,
            options: {}
        });
    }

    public getClient() : any
    {
        return this.plaidClient;
    }
}