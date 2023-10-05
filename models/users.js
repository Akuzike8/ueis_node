const Sequelize = require('sequelize')
const db = require('../controllers/dbController')

const users = db.define('users', {

        email:{
            type: Sequelize.STRING[35]
        },
        fingerprint_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        role:{
            type: Sequelize.ENUM(['user','admin']),
            allowNull: false
        },
        status:{
            type: Sequelize.ENUM(['active','blocked','inactive']),
            allowNull: false
        },
        ueis_id:{
            type: Sequelize.UUIDV4,
            allowNull: false
        },

})

module.exports = users;
