import { typeDefs } from './type-defs';
import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})