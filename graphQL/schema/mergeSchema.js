const { makeExecutableSchema } = require("@graphql-tools/schema"); // Updated import

const userAuthSchema = require("./graphQlUserAuthSchema")

const typeDefs = `

type Query {
_empty:String
}
type Mutation {
_empty:String
}

${userAuthSchema}

`

const schemaMerger = makeExecutableSchema({typeDefs})

module.exports = schemaMerger


