const config = require("../config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: "mysql",
    pool: {
      max: 15,
      min: 5,
      idle: 50000,
      evict: 50000,
      acquire: 50000,
    },
  });

  // init models and add them to the exported db object
  db.User = require("../users/user.model")(sequelize);
  db.Question = require("../questions/question.model")(sequelize);
  db.Category = require("../categories/categories.model")(sequelize);
  db.Exam = require("../exams/exam.model")(sequelize);
  db.Result = require("../results/result.model")(sequelize);
  // connection.release();
  // sync all models with database

  // await sequelize.sync();
  //--unhandled-rejections=strict`
}
