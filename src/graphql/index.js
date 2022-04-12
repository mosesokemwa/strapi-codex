const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('@graphql-tools/schema');


const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = schema;