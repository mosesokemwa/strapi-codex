const environment = process.env.NODE_ENV || 'development';
const knexfile = require('../../knexfile.js')[environment];

const config = { debug: false, ...knexfile };

const knex = require('knex')(config);

knex.select(knex.raw('1')).then(() => {
  console.log(`Connected to db ${knexfile.connection.database}@${knexfile.connection.host}:${knexfile.connection.port} as ${knexfile.connection.user} successfully`);
}, (e) => {
  console.log(`Connected to db ${knexfile.connection.database}@${knexfile.connection.host}:${knexfile.connection.port} as ${knexfile.connection.user} failed`);
  throw e;
});

// async function logPlanets() {
//   const planets = await knex('planet');
//   console.log('------await planets-------');
//   console.log(await planets);
// }

// logPlanets();

module.exports = knex;

module.exports.reconnect = () => require('knex')(config);