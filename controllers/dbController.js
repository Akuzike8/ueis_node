const Sequelize = require("sequelize")
const host = "localhost"
const db = "ueis"
const port = "3306"
const user = "root"
const password = "password123"


module.exports = new Sequelize(db,user,password,
    {
        host,
        dialect: 'mysql',
        operatorsAliases: false,
        pool:{
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
}) ;
