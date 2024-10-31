const userAuthSchema = `

type User {
id: ID!
name:String!
email:String!
phone:String!
password:String!
age: Int!
address:String!
role:String!
createdAt:String!
updatedAt:String!
}


type Auth {
token:String!
user:User!

}

  extend type Query {
    getProfile: User
  }

    extend type Mutation {
    register(name: String!, email: String!,phone:String!, password: String!,age: Int!, address:String!): Auth
    logIn(email: String!, password: String!): Auth
    updateProfile(name: String, phone:String, age: Int, address:String): User
    deleteProfile: String!
  }
`;

module.exports = userAuthSchema;
