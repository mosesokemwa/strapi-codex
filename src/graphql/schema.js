const { makeExecutableSchema } = require('@graphql-tools/schema');
const { Planet, SpaceCenter } = require('./types');
const knex =  require('../db/db');

const planetsResolvers = {
    async planets(parent, args, context, info) {
        console.log('------parent-------');
        console.log(parent);
        console.log('------args-------');
        console.log(args);
        console.log('------context-------');
        console.log(context);
        console.log('------info-------');
        console.log(info);
        const repository = await knex('planet');
        return await repository;
    }
};

const spaceCentersResolvers = {
    async spaceCenter(parent, args, context, info) {

        const repository = await knex('space_center');
        return await repository;
    }
};
const resolvers = {
    Query: {
        ...planetsResolvers,
        ...spaceCentersResolvers
    },
    // Mutation: {
    //     planet(parent, args) {
    //         console.log('args : ', args);
    //         return knex.from('planet').select(args);
    //     },
    //     spaceCenter(parent, args) {
    //         console.log('args : ', args);
    //         return knex.from('space_center').select(args);
    //     }
    // }
};

const Query = `
    type Query {
        planets: [Planet],
    }
    type Query {
        spaceCenter: [SpaceCenter]
    }
`;

const schemaDefinition = `
    schema {
        query: Query
    }
`;

const typeDefs = [
    schemaDefinition,
    Query,
    Planet,
    SpaceCenter
];


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema;
