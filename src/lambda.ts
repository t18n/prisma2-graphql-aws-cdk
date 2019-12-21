import { ApolloServer } from 'apollo-server-lambda';
import graphql from './graphql/graphql';

const server = new ApolloServer(graphql);

exports.handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
