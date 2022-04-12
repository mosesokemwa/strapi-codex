const { gql } = require('apollo-server-koa');
const { Query, Pagination, Flight, Planet, SpaceCenter, Booking } = require('./types/types');
const { Mutation, ScheduleFlightInput, BookFlightInput } = require('./mutations/mutations');

const schemaDefinition = `
schema {
    query: Query
    mutation: Mutation
}
`;


module.exports = gql(schemaDefinition + Query + Pagination + Flight + Planet + SpaceCenter + Booking + Mutation + ScheduleFlightInput + BookFlightInput);
