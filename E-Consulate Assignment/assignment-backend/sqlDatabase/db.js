
const Sequelize = require('sequelize');
const database = {};
const sequelize = new Sequelize('sql12353480', 'sql12353480', 'qzxBU9EC9n', {
  host: 'sql12.freemysqlhosting.net',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;