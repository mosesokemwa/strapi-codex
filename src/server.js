require("dotenv").config();
const Koa = require('koa');
const { typeDefs, resolvers } = require('./graphql/schema');
const { ApolloServer, gql } = require("apollo-server-koa");

const schema = require('./graphql/index');


const formatResponse = (re) => {
    // console.log("ctx.response.body : ", re);
    return re;
};

async function startServer() {
    const server = new ApolloServer({
        schema,
        uploads: {
            maxFileSize: 10000000, // 10 MB
            maxFiles: 20
        },
        formatResponse
    });
    await server.start();
    server.applyMiddleware({ app, path: "/grapghql" });
}
startServer();

const app = new Koa();


const PORT = process.env.PORT || 3000;
app.listen(PORT, _ => console.log(`Server is running on port ${PORT} on ${process.env.NODE_ENV}`));
