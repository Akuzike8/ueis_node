const Sequelize = require('sequelize')
const db = require('../controllers/dbController')


const cards = db.define('cards', {
    card_id:{
        type: Sequelize.STRING
    },
    ueis_id:{
        type: Sequelize.UUIDV4
    },
    status:{
        type: Sequelize.ENUM(['active','blocked','stolen','lost'])
    }
})

module.exports = cards;
