## Strapi CodeX (SpaceX) Journey

Getting started with Strapi Codex is easy.

- Install all dependencies ``yarn``
- Install Docker or start docker daemons

To run the project locally, run the following command:
On your terminal run:

```bash
docker-compose up -d
```

to shut down, run:
  ```bash
  docker-compose down
  ```


#### Available GraphQL Queries and Mutations
```
type Query {
  planets: [Planet]
  spaceCenters(page: Int, pageSize: Int): SpaceCenter
  spaceCenter(uid: String): SpaceCenter
  flights(page: Int, pageSize: Int): Flight
  flight(id: Int): Flight
  bookings(page: Int, pageSize: Int, email: String): Booking
  booking(id: Int): Booking
}

type Mutation {
  scheduleFlight(flightInfo: ScheduleFlightInput): Flight
  bookFlight(bookingInfo: BookFlightInput): Booking
}
```
### Example Queries and Mutations you can try

#### Queries

- `planets`: Returns the list of all planets.

  **Example query**

  ```graphql
  query planets {
    planets {
      id
      name
      code
      spaceCenters(limit: 3) {
        id
      }
    }
  }
  ```

- `spaceCenters`: Returns a paginated list of space centers.

  **arguments**:

  - `page`: page index (starting at 1) (default: 1, min: 1).
  - `pageSize`: number of items returned per page (default: 10, min: 1, max: 100).

  **Example query**

  ```graphql
  query spaceCenters {
    spaceCenters {
      pagination {
        total
        page
        pageSize
      }
      nodes {
        id
        uid
        name
        description
        latitude
        longitude
        planet {
          id
          name
          code
        }
      }
    }
  }
  ```

- `spaceCenter`: Returns a space center.

  **arguments**:

  - `id` : id of the space center.
  - or `uid`: uid of the space center.

  **Example Query**

  ```graphql
  query spaceCenter {
    spaceCenter(uid: "e28f6ef2-62ab-4a22-a778-bef1b32900a6") {
      id
      uid
      name
      description
      planet {
        id
        name
        code
      }
    }
  }
  ```

- `flights`: Returns a list of **`Flight`**.

  **arguments**:

  - `from`: id of a **`SpaceCenter`**.
  - `to`: id of a **`SpaceCenter`**.
  - `seatCount`: number of seats required.
  - `departureDay`: ISO date (e.g 1970-01-01).
  - `page` : deafult: 1, min: 1.
  - `pageSize`: deafult: 10, min: 1 max: 100.

  **Example query**

  ```graphql
  query flights {
    flights(pageSize: 1, page: 3) {
      pagination {
        total
        page
        pageSize
      }
      nodes {
        id
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
      }
    }
  }
  ```

- `flight`: a **`Flight`**

  **arguments**:

  - `id`: **`Flight`** id

  **Example query**

  ```graphql
  query flight {
    flight(id: 1) {
      id
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
    }
  }
  ```

- `bookings`: Returns a list of **`Booking`**.

  **arguments**:

  - `email`: use email.
  - `page`: page number (default: 1, min: 1).
  - `pageSize`: number of items returned (default: 10, min: 1, max: 100).

  **Example Query**

  ```graphql
  query bookings {
    bookings(email: "test@strapi.io", page: 1) {
      pagination {
        total
        page
        pageSize
      }
      nodes {
        id
        seatCount
        flight {
          code
        }
      }
    }
  }
  ```

- `booking`: Returns a **`Booking`** by `id`.

  **arguments**:

  - `id`: **`Booking`** id.

  **Example query**

  ```graphql
  query booking {
    booking(id: 1) {
      id
      flight {
        code
        landingSite {
          uid
        }
      }
    }
  }
  ```

#### Mutations

- `scheduleFlight`: Create a **`Flight`**.

  **arguments**:

  - `flightInfo`:
    - `launchSiteId`: a **`SpaceCenter`** id.
    - `landingSiteId`: a **`SpaceCenter`** id.
    - `departureAt`: a Date & time of departure.
    - `seatCount`: the number of total seats on this **`Flight`**.

  **Example mutation**

  ```graphql
  mutation scheduleFlight($flight: ScheduleFlightInput!) {
    scheduleFlight(flightInfo: $flight) {
      id
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
  ```

- `bookFlight`

  **arguments**:

  - `bookingInfo`:
    - `seatCount`: number of seats to book (if available).
    - `flightId`: id of the **`Flight`** booked.
    - `email`: email address to record the booking.

  **Example mutation**

  ```graphql
  mutation book {
    bookFlight(
      bookingInfo: { seatCount: 10, flightId: 1, email: "test@strapi.io" }
    ) {
      id
      flight {
        code
        availableSeats
        seatCount
      }
      email
    }
  }
  ```
### How to authenticate to this graphql server
Authentication is not yet supported



### Improvements
- Cache ``node_modules`` during docker build time to reduce build time
- Add auth token to the graphql endpoint
- Provide metrics for the graphql server queries
- Create a health check endpoint
- JSON API docs
- Seed data for all models
- Make use [PM2](https://pm2.io/docs/runtime/overview/) for production deployment