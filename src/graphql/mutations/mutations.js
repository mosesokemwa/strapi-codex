const ScheduleFlightInput = `
input ScheduleFlightInput {
    code: String,
    launchSiteId: String,
    landingSiteId: String,
    departureAt: String,
    seatCount: Int,
    availableSeats: Int,
  }
  `;

  const BookFlightInput = `
  input BookFlightInput {
    email: String,
    flightId: Int,
    seatCount: Int,
  }
  `;

  const Mutation = `
    type Mutation {
      scheduleFlight(flightInfo: ScheduleFlightInput): Flight,
      bookFlight(bookingInfo: BookFlightInput): Booking,

    }
`;
module.exports = {
    Mutation,
    ScheduleFlightInput,
    BookFlightInput,
};