import typeDefs from './schema';
import context from './context';
import resolvers from './resolvers';

const graphql = {
  resolvers,
  context,
  typeDefs,
  tracing: true,
};

export default graphql;
