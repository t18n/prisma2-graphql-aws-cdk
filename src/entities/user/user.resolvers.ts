// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    users: async (_obj, _args, { db }, _info) => {
      const data = await db.users.findMany({
        where: {
          NOT: {
            email: null,
          },
        },
        include: {
          products: true,
          orders: true,
        },
      });
      console.log(data);

      return data;
    },
  },
};

export default resolvers;
