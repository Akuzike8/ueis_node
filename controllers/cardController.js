

class cardController
{
    static authenticate = async (id) => {
        try {

            const cards = require("../models/cards")

            const card = await cards.findAll({where:{card_id: id}})

            if (!card) throw new Error("card does not exists");

            return true;

        } catch (error) {

            return error.message;
        }
    }

    static register = async (card_id,ueis_id) => {
        try {
            const cards = require("../models/cards")

            const card = await cards.create({card_id,ueis_id})

            if (!card) throw new Error("Failed to register card");


        } catch (error) {

            console.log(error.message)
            return error.message;
        }

    }
}

module.exports = cardController;