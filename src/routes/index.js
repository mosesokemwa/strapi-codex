const { graphqlHTTP } = require('koa-graphql');
const Router = require('@koa/router');
const router = new Router({ prefix: '/api/v1' });
const schema = require('../schema/schema');




async function someFunctionToGetRootValue(request) {
    // do something with request
    print('We are here')
    return {
        hello: () => 'Hello world!'
    };
}

const root = await someFunctionToGetRootValue(request)
router.all('/graphql',
    // graphqlHTTP({
    //     schema: schema,
    //     graphiql: true,
    //     // rootValue: root
    //     rootValue: ,
    // }));
    graphqlHTTP(async (request, response, ctx, graphQLParams) => ({
        schema: MyGraphQLSchema,
        rootValue: await someFunctionToGetRootValue(request),
        graphiql: true,
    })));

module.exports = router;