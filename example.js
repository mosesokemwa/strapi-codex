const Koa = require("koa");
const { graphqlHTTP } = require('koa-graphql');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();
const port = 3000;
const { typeDefs, resolvers } = require('./src/graphql/schema');

const { makeExecutableSchema } = require('graphql-tools');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

router.all(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    }),
);

// app.use(
//     '/graphql',
//     graphqlHTTP({
//         schema: schema,
//         graphiql: true
//     })
// );

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => console.log(`Node Graphql API listening on port ${port}!`));