import { gql } from 'apollo-server-lambda';

const postSchema = gql`
  extend type Query {
    orders: [Order!]
  }

  type Order {
    id: String
    price: Int
    currency: String
    status: Boolean
    user: User!
  }
`;

export default postSchema;
