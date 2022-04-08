const Koa = require('koa');
const Router = require('@koa/router');
const {graphqlHTTP} = require('koa-graphql');
const { buildSchema } = require('graphql');

const app = new Koa();
const router = new Router();

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
    hello: () => 'Hello world!'
};

router.all('/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
        rootValue: root
    }));
app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, _ => console.log('Server is running on port 3000'));
