// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    orders: async (_obj, _args, { db }, _info) => {
      const data = await db.orders.findMany({
        where: {
          NOT: {
            price: 0,
          },
        },
        include: { user: true },
      });
      console.log(data);

      return data;
    },
  },
};

export default resolvers;
