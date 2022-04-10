// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const path = require('path');

const BASE_PATH = path.join(__dirname, 'src', 'db');

let connections;
try {
  connections = require('./src/config/db');
} catch (e) {
  connections = require('./src/config/db.example');
}

const {
  POSTGRES_USER: user,
  POSTGRES_DB: database,
  POSTGRES_HOST: host,
  POSTGRES_PASSWORD: password,
  POSTGRES_PORT: port
} = process.env;
let env_credentials;

if (user && host && database && password) {
  env_credentials = {
    user,
    database,
    host,
    password,
    port
  };
}

module.exports = {
  test: {
    client: 'pg',
    connection: env_credentials || connections.test,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    // connection: env_credentials || connections.development,
    connection: 'postgres://localhost/strapi_dev',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};