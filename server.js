require("dotenv/config");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const expressPlayground =
  require("graphql-playground-middleware-express").default;
// merger Schema
const schemaMerger = require("./graphQL/schema/mergeSchema.js")
// merger Resolver 
const resolverMerger = require("./graphQL/resolvers/mergeResolvers.js")
//authentication 
const { authentication } = require("./middi/auth.js");

const app = require("./app.js");
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URL_LOCAL)

  .then(() => {
    console.log("mongodb connected successfullly");
  })
  .catch(() => {
    err.message;
  });

  const schema = makeExecutableSchema({
    typeDefs: schemaMerger,
    resolvers: resolverMerger,
  });

// Set up GraphQL endpoint
app.use(
    "/graphql",
    graphqlHTTP(async (req) => {
      const context = await authentication(req);
      return {
        schema,
        graphiql: false, 
        context,
      };
    })
  );

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(
    `GraphQL Playground available at http://localhost:${port}/playground`
  );
});
