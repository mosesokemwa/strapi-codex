/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


const spaceCentersData = require('../data/spaceCenters.json');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('space_center').del()
  await knex('space_center').insert(spaceCentersData);
};
