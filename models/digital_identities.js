const Sequelize = require('sequelize')
const db = require('../controllers/dbController')

const digital_identities = db.define('digital_identities',{
    id:{
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nid:{
        type: Sequelize.CHAR[10]
    },
    permit_number:{
        type: Sequelize.STRING[10]
    },
    passport_number:{
        type: Sequelize.STRING[10]
    }



})

module.exports = digital_identities;
