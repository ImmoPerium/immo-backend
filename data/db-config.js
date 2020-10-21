const knex = require('knex');
require('dotenv').config();

const knexConfig = require('../knexfile.js');

const dbEnv = process.env.DB_ENV || 'development';
console.log('ENV:', process.env.DB_ENV);

module.exports = knex(knexConfig[dbEnv]);