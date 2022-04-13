const Koa = require('koa');
const { ApolloServer } = require("apollo-server-koa");

const schema = require('./graphql/index');


const formatResponse = (re) => {
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
    server.applyMiddleware({ app, path: "/graphql" });
}
startServer();

const app = new Koa();

const PORT = process.env.PORT || 3000;
app.listen(PORT, _ => console.log(`Server is running on port ${PORT} on ${process.env.NODE_ENV}`));
// const { ApolloServer } = require('apollo-server-koa');
// const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
// const Koa = require('koa');
// const http = require('http');
// const schema = require('./graphql/index');
// const PORT = process.env.PORT || 3000;


// async function startApolloServer(schema) {
//     const httpServer = http.createServer();
//     const server = new ApolloServer({
//         schema,
//         plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//     });

//     await server.start();
//     const app = new Koa();
//     server.applyMiddleware({ app, path: "/graphql" });
//     httpServer.on('request', app.callback());
//     await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
//     // console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
//     return { server, app };
// }

// const { server } = startApolloServer(schema);
// module.exports = server;