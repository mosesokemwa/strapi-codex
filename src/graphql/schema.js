const typeDefs = require('./types');
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
        let nodes = await knex('space_center')
            .select('space_center.id', 'space_center.uid', 'space_center.name', 'space_center.description', 'space_center.latitude', 'space_center.longitude', 'space_center.planet_code', 'space_center.created_at', 'space_center.updated_at', 'space_center.planet_code',
                'planet.id as planet_id', 'planet.name as planet_name', 'planet.code as planet_code')
            .join('planet', 'planet.code', 'space_center.planet_code')
            .offset(offset).limit(pageSize);
        nodes = nodes.map(node => {
            node.planet = {
                code: node.planet_code,
                name: node.planet_name,
                id: node.planet_id
            };
            delete node.planet_code;
            delete node.planet_name;
            delete node.planet_id;
            return node;
        });
        console.log(nodes[0]);
        return {
            pagination: {
                total: total[0].total,
                page,
                pageSize,
            },
            nodes,
        };
    },
};

const resolvers = {
    Query: {
        ...planetsResolvers,
        ...spaceCentersResolvers
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
    },

};

module.exports = {
    typeDefs,
    resolvers
};