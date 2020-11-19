import { 
    Resolver, 
    Int, 
    Query, 
    Args, 
    Parent, 
    ResolveField 
} from '@nestjs/graphql';
import { Account } from '../models/accounts.model';
import { PlaidService } from '../services/plaid.service';

@Resolver(of => Account)
export class AccountResolver {
  constructor(
    private plaidService: PlaidService,
  ) {}

  @Query(returns => Account)
  async author() {
    return this.plaidService.getClient().getAccounts()
  }

//   @ResolveField()
//   async posts(@Parent() account: Account) {
//     // const { id } = author;
//     // return this.postsService.findAll({ authorId: id });
//   }
}