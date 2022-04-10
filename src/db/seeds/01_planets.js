/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const planetsData = require('../data/planets.json');
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('planet').del()
  await knex('planet').insert(planetsData);
};
