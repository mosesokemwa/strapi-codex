const { gql } = require('apollo-server-koa');

const Query =`
    type Query {
      planets: [Planet],
      spaceCenters: SpaceCenter,
    }
`;

const schemaDefinition = `
schema {
    query: Query
}
`;

const Pagination = `
type Pagination {
  total: Int,
  page: Int,
  pageSize: Int,
}
`;

const Planet = `
type Planet {
  id: ID!,
  name: String,
  code: String,
  spaceCenters(limit: Int): [SpaceCenter],
}

input PlanetInput {
  name: String,
  code: String,
}
`;

const SpaceCenter = `
type SpaceCenter {
  id: ID!,
  uid: String,
  name: String,
  description: String,
  latitude: Float,
  longitude: Float,
  spaceCenters: [SpaceCenter],
  nodes: [SpaceCenter],
  pagination(page: Int, pageSize: Int): Pagination,
  planet: Planet,
},

input SpaceCenterInput {
  uid: String,
  name: String,
  description: String,
  planet: String,
  latitude: Float,
  longitude: Float,

}
`;
const BookingFields = `
type BookingFields {
  id: ID!,
  flight: [Flight],
  seatCount: Int,
  email: String,
}
`;

const Flight = `
type Flight {
  id: ID!,
  code: String,
  launchSite: [SpaceCenter],
  landingSite:[SpaceCenter],
  departureAt: String,
  seatCount: Int,
  availableSeats: Int,
}
`;




const typeDefs = gql(Planet + SpaceCenter + Query + schemaDefinition + Pagination + BookingFields + Flight );

module.exports = typeDefs;
