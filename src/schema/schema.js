const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const planets = buildSchema(`
type Planet {
  id: Int,
  name: String,
  code: String,
  spaceCenters: [SpaceCenter]
  appearsIn: [SpaceCenter!]!
}
`);



const SpaceCenter = buildSchema(`
type SpaceCenter {
  id: Int,
  uid: String,
  name: String,
  description: String,
  planet: [Planet]
  latitude: Float,
  longitude: Float,
  }
`);

module.exports = schema;


