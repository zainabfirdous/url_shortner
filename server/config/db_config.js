const {Sequelize} = require("sequelize")
require('dotenv').config();
const sequelize = new Sequelize({
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:'127.0.0.1',
    dialect:'mysql',
    port:'3306'
}
)

module.exports = {sequelize}