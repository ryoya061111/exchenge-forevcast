'use strict';

const config = {
  MYSQL_HOST: 'localhost',
  MYSQL_DB: 'exchenge_forecast',
  MYSQL_USER: 'root',
  MYSQL_PASSWORD: 'ffrrffrr1',
  MYSQL_CONNECTIONPOOL: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  SECRET: 'ff32f2e11b2a8715'
};

module.exports = config;