const knex = require('knex');

const knexConfig = require('../knexfile.js');

const environment = process.env.NODE_ENV || "development";

module.exports = knex(knexConfig[environment]);


// module.exports = knex(knexConfig.development);


/*
DATABASE_URL=postgres://postgres:Rafeek123@host:5432/postgres
*/