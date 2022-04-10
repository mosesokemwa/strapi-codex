/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema
    .createTable('planet', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('code').unique();
        table.timestamps(true, true);
    })
    .createTable('space_center', table => {
        table.increments('id').primary();
        table.string('uid').unique();
        table.string('name');
        table.string('description', 1000);
        table.float('latitude');
        table.float('longitude');
        table.string('planet_code').references('code').inTable('planet').onDelete('SET NULL');
        table.timestamps(true, true);
    })
    .createTable('flight', table => {
        table.increments('id').primary();
        table.string('planet_code').references('code').inTable('planet');
        table.dateTime('departure_at').defaultTo(knex.fn.now());
        table.integer('seat_count').defaultTo(0);
        table.string('launching_site').references('uid').inTable('space_center').onDelete('SET NULL');
        table.string('landing_site').references('uid').inTable('space_center').onDelete('SET NULL');
        table.timestamps(true, true);
    })
    .createTable('booking', table => {
        table.increments('id').primary();
        table.integer('flight_id').references('id').inTable('flight');
        table.integer('seat_count').defaultTo(0);
        table.string('email');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('booking')
    .dropTable('flight')
    .dropTable('space_center')
    .dropTable('planet');
};
