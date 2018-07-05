const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");
const resolvers = require("./resolvers");

const db = new Prisma({
  // the auto-generated GraphQL schema of the Prisma API
  typeDefs: "src/generated/prisma.graphql",
  // the endpoint of the Prisma API (value set in `.env`)
  endpoint: process.env.PRISMA_ENDPOINT,
  // log all GraphQL queries & mutations sent to the Prisma API
  debug: true,
  // only needed if specified in `database/prisma.yml` (value set in `.env`)
  secret: process.env.PRISMA_SECRET,
});

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({ ...req, db }),
});

// eslint-disable-next-line no-console
server.start(() => console.log("Server is running on http://localhost:4000"));
