import { gql } from 'apollo-server-lambda';

const userSchema = gql`
  extend type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    firstName: String!
    email: String
    birthday: String!
    products: [Product!]
    orders: [Order!]
  }
`;

export default userSchema;
