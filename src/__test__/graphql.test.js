// test("A sample test", () => {
//     expect(2).toBe(2);
// });

const { ApolloServer, gql } = require("apollo-server-koa");
const { createTestClient } = require("apollo-server-testing");

const server = new ApolloServer({
  schema: require("../graphql/index"),
});

const { query, mutate } = createTestClient(server);

test("find user", async () => {
  const SPACE_CENTER = gql`
    query {
      spaceCenter(uid: "e28f6ef2-62ab-4a22-a778-bef1b32900a6") {
      id
      uid
      name
      description,
      planet {
        id
        name
        code
      }
    }
    }
  `;

  const { data: { spaceCenter } } = await query({ query: SPACE_CENTER });

  expect(spaceCenter).toEqual({
    "id": "2069",
    "uid": "e28f6ef2-62ab-4a22-a778-bef1b32900a6",
    "name": "Blair Dale Space Center",
    "description": "Inventore ea dolorum quis temporibus eum ut voluptas qui. Impedit harum culpa quo voluptas harum. Reprehenderit voluptatibus perferendis dolor ipsum dicta quaerat sapiente. Ex aut cumque vel autem consequuntur sapiente. Soluta quos fuga minus et.",
    "planet": {
      "id": "30",
      "name": "Europa",
      "code": "JUP_EUR"
    }
  });
});


test("scheduleFlight", async () => {

  const FLIGHT_INFO = {
    "code": "MER",
    "launchSiteId": "4f4643eb-b426-4f4d-b8eb-4a1ba7381cee",
    "landingSiteId": "db34b2b7-3b9c-45f2-9688-45b154a3dcad",
    "departureAt": "2022-04-12 21:30:37.862575+03",
    "seatCount": 5
  }
  const SCHEDULE_FLIGHT = gql`
    mutation( $flight: ScheduleFlightInput!) {
        scheduleFlight(flightInfo: $flight) {
            code
            launchSite {
              name
              planet {
                name
              }
            }
            landingSite {
              name
              planet {
                name
              }
            }
            availableSeats
            seatCount
            departureAt
          }
        }
    `;

  const { data: { scheduleFlight } } = await mutate({ mutation: SCHEDULE_FLIGHT, variables: { flight: FLIGHT_INFO } });
  expect(scheduleFlight).toEqual({
    "code": "MER",
    "launchSite": {
      "name": "Lorenz Track Space Center",
      "planet": {
        "name": "Venus"
      }
    },
    "landingSite": {
      "name": "Weissnat Radial Space Center",
      "planet": {
        "name": "Earth"
      }
    },
    "availableSeats": null,
    "seatCount": 5,
    "departureAt": "1649788237862"
  });
});
