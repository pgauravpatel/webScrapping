/****************Sync DB Instance***************/
const { Sequelize } = require('sequelize');
const propertyModel = require('./models/property');
const DB_NAME = 'magicbricks';
const DB_USER = 'postgres';
const DB_PASSWORD = 'abc';
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

const Property = propertyModel(sequelize);

sequelize.sync();

module.exports = { sequelize, Property };
