require("dotenv").config();
const Koa = require('koa');
const Router = require('@koa/router');


const indexRoutes = require('./routes/index');

const app = new Koa();

app.use(indexRoutes.routes());

// app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, _ => console.log(`Server is running on port ${PORT} on ${process.env.NODE_ENV}`));
