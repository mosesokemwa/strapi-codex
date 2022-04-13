const { ApolloError } = require('apollo-server-koa');
const { verifyToken } = require("./authToken");


async function getUser(token) {
    const user = verifyToken(token);
    if (!user) throw new ApolloError('Unauthorized');
    return user;
}

module.exports = getUser;