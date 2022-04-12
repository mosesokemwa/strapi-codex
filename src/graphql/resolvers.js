const knex = require('../db/db');

const planetsResolvers = {
    async planets() {
        const planets = await knex('planet');
        return await planets;
    },
};

const spaceCentersResolvers = {
    async spaceCenters(parent, args, context, info) {
        let page = args.page || 1;
        const pageSize = args.pageSize || 10;
        if (page < 1) page = 1;
        const offset = (page - 1) * pageSize;
        const total = await knex('space_center').count('id as total');
        const nodes = await knex('space_center')
            .offset(offset)
            .limit(pageSize);
        return {
            pagination: {
                total: total[0].total,
                page,
                pageSize,
            },
            nodes,
        };
    },

    async spaceCenter(parent, args, context, info) {
        const spaceCenter = await knex('space_center').where('uid', args.uid).first();
        if (!spaceCenter) {
            throw new Error('Space Center not found');
        }
        return spaceCenter;
    }
};


const flightsResolvers = {
    async flights(parent, args, context, info) {
        let page = args.page || 1;
        const pageSize = args.pageSize || 10;
        if (page < 1) page = 1;
        const offset = (page - 1) * pageSize;
        const total = await knex('flight').count('id as total');
        const nodes = await knex('flight');
        // .offset(offset).limit(pageSize);

        return {
            pagination: {
                total: total[0].total,
                page,
                pageSize,
            },
            nodes,
        };
    },
    async flight(parent, args, context, info) {
        const flight = await knex('flight').where('id', args.id).first();
        if (!flight) {
            throw new Error('Flight not found');
        }
        return flight;
    }
};

const BookingsResolvers = {
    async bookings(parent, args, context, info) {
        let page = args.page || 1;
        const pageSize = args.pageSize || 10;
        if (page < 1) page = 1;
        const offset = (page - 1) * pageSize;
        const total = await knex('booking').count('id as total');
        let nodes = await knex('booking').where('email', args.email);
        // .join('flight', 'flight.id', 'booking.flight_id')
        // .offset(offset).limit(pageSize);
        nodes = nodes[0];

        console.log(nodes);
        return {
            pagination: {
                total: total[0].total,
                page,
                pageSize,
            },
            nodes,
        };
    },
    async booking(parent, args, context, info) {
        const booking = await knex('booking').where('id', args.id).first();
        if (!booking) {
            throw new Error('Booking not found');
        }
        return booking;
    }
};


const scheduleFlightMutation = {
    async scheduleFlight(_, { flightInfo }) {
        console.log('----flightInfo----', flightInfo);
        // const flight = await knex('flight').insert(flightInfo);
        // return flight;

    }
};

const BookFlightMutation = {
    async bookFlight(_, { bookingInfo}) {
        console.log('----bookingInfo----');
        console.log(bookingInfo);
        // const flight = await knex('flight').where('id', args.bookingInfo.flightId).first();
        // if (!flight) {
        //     throw new Error('Flight not found');
        // }
        // const booking = await knex('booking').insert({
        //     email: args.email,
        //     flight_id: args.flightId,
        //     seat_count: args.seatCount,
        // });
        return bookingInfo;
    }
};
const resolvers = {
    Query: {
        ...planetsResolvers,
        ...spaceCentersResolvers,
        ...flightsResolvers,
        ...BookingsResolvers,
    },
    Mutation: {
        ...scheduleFlightMutation,
        ...BookFlightMutation,
    },
    Planet: {
        async spaceCenters(parent, args, context, info) {
            const repository = await knex('space_center').where('planet_code', parent.code)
                .limit(args.limit || 10);
            return await repository;
        }
    },
    SpaceCenter: {
        async nodes(parent, args, context, info) {
            return parent.nodes;
        },
        async pagination(parent, args, context, info) {
            return parent.pagination;
        },
        async planet(parent, args, context, info) {
            if (parent.planet_code) {
                const planet = await knex('planet').where('code', parent.planet_code).first();
                return planet;
            }
        }
    },
    Flight: {
        async nodes(parent, args, context, info) {
            return parent.nodes;
        },
        async pagination(parent, args, context, info) {
            return parent.pagination;
        },
        async launchSite(parent, args, context, info) {
            if (parent.launching_site_id) {
                return await knex('space_center').where('uid', parent.launching_site_id).first();
            }
        },
        async landingSite(parent, args, context, info) {
            if (parent.landing_site_id) {
                return await knex('space_center').where('uid', parent.landing_site_id).first();
            }
        }
    },
    Booking: {
        async pagination(parent, args, context, info) {
            return parent.pagination;
        },
        async nodes(parent, args, context, info) {
            parent.nodes.seatCount = parent.nodes.seat_count;
            return parent.nodes;
        },
        async flight(parent, args, context, info) {
            const flight = await knex('flight').where('id', parent.flight_id).first();
            if (!flight) {
                throw new Error('Flight not found');
            }
            return flight;
        }
    },
};


module.exports = resolvers;