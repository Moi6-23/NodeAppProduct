const { Sequelize } = require('sequelize');
const {config} = require('../config/config');
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${config.dbType}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const setupModels = require('../db/models/index')

const sequelize = new Sequelize(URI, {
  dialect: config.dbType,
  logging: true,
})
// Se configura el modelo
setupModels(sequelize)
// Permite crear la estructura sino hay migraciones
// sequelize.sync();

module.exports = sequelize;