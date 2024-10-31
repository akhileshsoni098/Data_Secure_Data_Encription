const userAuthResolvers = require("./graphQLUserResolver")


const mergerResolvers = {
    ...userAuthResolvers,
}

module.exports = mergerResolvers