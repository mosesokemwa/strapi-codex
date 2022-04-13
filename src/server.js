require('dotenv').config()
const Koa = require('koa');
const KoaRouter = require('@koa/router');
const { ApolloServer } = require("apollo-server-koa");
const schema = require('./graphql/index');
const getUser = require("./utils/isAuthorized");
const { signToken } = require("./utils/authToken");

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
        formatResponse,
        context: async ({ ctx }) => {
            const token = ctx.request.headers.authorization || "";
            const user = await getUser(token);
            if (!user) throw new AuthenticationError('you must be logged in');
            return { user };
        },

    });
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });
}
startServer();



const app = new Koa();
const router = new KoaRouter();

// jwt token endpoint
router.get('/', (ctx) => {
    const data = {
        "name": "Moses Okemwa",
        "email": "okemwamoses@gmail.com",
        "company_email": "okemwamoses@strapi.io",
        "role": "Senior Backend Engineer",
        "location": "remote",
        "id": 1,
        "user_id": 1,
        "org": "strapi",
        "start_date": "2022-05-01 21:35:02.028065+03",
        "reason": "I nejoyed working on this projects, wil loove to work at Strapi to grow the company"
    }
    ctx.status = 200;
    ctx.body = { token: signToken(data) };
});

app.use(router.routes()).use(router.allowedMethods());
const PORT = process.env.PORT || 3000;
app.listen(PORT, _ => console.log(`Server is running on port ${PORT} on ${process.env.NODE_ENV}`));
