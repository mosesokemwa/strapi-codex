
const Query =`
    type Query {
      planets: [Planet],
      spaceCenters(page: Int, pageSize: Int): SpaceCenter,
      spaceCenter(uid: String): SpaceCenter,
      flights(page: Int, pageSize: Int): Flight,
      flight(id: Int): Flight,
      bookings(page: Int, pageSize: Int, email: String): Booking,
      booking(id: Int): Booking,
    }
`;

const Pagination = `
type Pagination {
  total: Int,
  page: Int,
  pageSize: Int,
}
`;

const Flight = `
type Flight {
  id: ID!,
  code: String,
  launchSite: SpaceCenter,
  landingSite: SpaceCenter,
  departureAt: String,
  seatCount: Int,
  availableSeats: Int,
  nodes: [Flight],
  pagination(page: Int, pageSize: Int): Pagination,
}
`;




const Planet = `
type Planet {
  id: ID!,
  name: String,
  code: String,
  spaceCenters(limit: Int): [SpaceCenter],
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

`;
const Booking = `
type Booking {
  id: ID!,
  flight: Flight,
  seatCount: Int,
  email: String,
  nodes: Booking,
  pagination(page: Int, pageSize: Int): Pagination,
}
`;

module.exports = {
    Query,
    Pagination,
    Flight,
    Planet,
    SpaceCenter,
    Booking,
};

