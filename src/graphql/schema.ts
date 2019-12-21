import { gql } from 'apollo-server-lambda';
import userSchema from '../entities/user/user.schema';
import productSchema from '../entities/product/product.schema';
import orderSchema from '../entities/order/order.schema';
import databaseSchema from '../entities/database/database.schema';

const baseTypeDefs = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

const schema = [baseTypeDefs, userSchema, productSchema, orderSchema, databaseSchema];

export default schema;
