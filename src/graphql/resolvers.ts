import userResolvers from '../entities/user/user.resolvers';
import productResolvers from '../entities/product/product.resolvers';
import orderResolvers from '../entities/order/order.resolvers';
import databaseResolvers from '../entities/database/database.resolvers';

const resolvers = [userResolvers, productResolvers, orderResolvers, databaseResolvers];

export default resolvers;
