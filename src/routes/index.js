const Router = require('@koa/router');
const { graphqlHTTP } = require('koa-graphql');
const schema = require('../graphql/schema');

const router = new Router();

router.get(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    }),
);


router.post(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    }),
);


module.exports = router;
