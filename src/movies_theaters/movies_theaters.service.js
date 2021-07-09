const knex = require('../db/connection');

const list = () => {
    return knex('movies_theaters')
        .select('*')
}

module.exports = {
    list,
};