require('babel-register');
require('dotenv').config({path: '../.env'});

module.exports = {
  client: 'mysql2',
  asyncStackTraces: true,
  connection: process.env.DB_URI,
  seeds: {
    directory: './knex/seeds',
  },
  migrations: {
    directory: './knex/migrations',
  },
};
