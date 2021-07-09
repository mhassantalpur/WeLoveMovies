const knex = require('../db/connection');

const list = () => {
  return knex('critics')
    .select('*')
}

module.exports = {
  list
};