// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    products: async (_obj, _args, { db }, _info) => {
      const data = await db.product.findMany({
        where: {
          NOT: {
            name: null,
          },
        },
        include: { user: true },
      });
      console.log(data);

      return data;
    },
  },

  // Product: {
  //   owner: async (product, _args, { db }, _info) => {
  //     const userData = await db.users.findOne({
  //       where: {
  //         id: product.user,
  //       },
  //     });
  //     return userData;
  //   },
  // },
};

export default resolvers;
