const Sequelize = require('sequelize')
const db = require('../controllers/dbController')


const services = db.define('services', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    third_party_id:{type: Sequelize.INTEGER, allowNull: false},

    name:{type: Sequelize.STRING, allowNull: false},

    description:{type: Sequelize.STRING, allowNull: false},

    category:{
        type: Sequelize.ENUM(['E-Banking','E-Voting','E-Payment','E-Health','Digital-Signature']),
        defaultValue: 'E-Banking'
    },

    status:{
        type: Sequelize.ENUM(['active','inactive','blocked']),
        defaultValue: 'active'
    },

})

module.exports = services;
