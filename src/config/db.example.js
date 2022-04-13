module.exports = {
  action: {
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
  },
  test: {
    host: 'localhost',
    database: 'strapi_test',
    user: 'postgres',
    password: 'password',
    port: '5432'
  },
  development: {
    host: 'localhost',
    database: 'strapi_dev',
    user: 'postgres',
    password: 'password',
    port: '5432'
  },
  production: {
    host: 'postgres_koa_container',
    database: 'strapi',
    user: 'postgres',
    password: 'password',
    port: '5432'
  }
};