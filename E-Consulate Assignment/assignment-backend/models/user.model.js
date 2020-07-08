const Sequelize = require('sequelize');
const db = require('../sqlDatabase/db');

module.exports = db.sequelize.define(
  'userTable',
  {
    userID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    password: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  },
  {
      freezeTableName: true, timestamps: false
    }
);