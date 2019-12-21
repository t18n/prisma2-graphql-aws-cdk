// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    database: () => {
      return {
        queryString: process.env.DB_CONNECTION,
      }
    }
  },
};

export default resolvers;
