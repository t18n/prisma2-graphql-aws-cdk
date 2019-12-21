import { gql } from 'apollo-server-lambda';

const postSchema = gql`
  extend type Query {
    products: [Product!]
  }

  type Product {
    id: String
    name: String
    serialNumber: String
    user: User
  }
`;

export default postSchema;
