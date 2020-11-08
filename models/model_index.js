const Sequelize = require("sequelize");
const SequelizePaginate = require('sequelize-paginate')
const DBConfig = require("../config/config_db.js");

const SequelizeDB = new Sequelize( DBConfig.db, DBConfig.user, DBConfig.password, {
  host: DBConfig.host,
  dialect: DBConfig.dialect,
  define : { timestamps: false , freezeTableName: true }
});

const db = {};
db.Sequelize = Sequelize;
db.SequelizeDB = SequelizeDB;

/***
START of Model declaration
***/

db.citizen = require("./model_citizen.js")(SequelizeDB, Sequelize, SequelizePaginate);

/***
END of Model declaration
***/

module.exports = db;