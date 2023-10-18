const Sequelize = require('sequelize')
const db = require('../controllers/dbController')


const third_parties = db.define('third_parties', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name:{type: Sequelize.STRING},

    company_id:{type: Sequelize.STRING},

    description:{type: Sequelize.STRING},

    email:{type: Sequelize.STRING},

    phone:{type: Sequelize.STRING},

    Location:{type: Sequelize.STRING},

    status:{
        type: Sequelize.ENUM(['valid','invalid']),
        defaultValue: 'valid'
    },

})

module.exports = third_parties;
