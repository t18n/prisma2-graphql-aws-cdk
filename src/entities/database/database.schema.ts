import { gql } from 'apollo-server-lambda';

// This schema is only for development purpose, testing environment variable  on serverless env
const postSchema = gql`
  extend type Query {
    database: Database
  }

  type Database {
    queryString: String
  }
`;

export default postSchema;
