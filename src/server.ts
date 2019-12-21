import { ApolloServer } from 'apollo-server';
import graphql from './graphql/graphql';

const server = new ApolloServer(graphql);

server.listen({ port: 4000 }, () => console.log(`🚀 Server ready at: http://localhost:4000\n⭐️`));
