class cardController
{
    static authenticate = (id) => {
        try {

            const db = require("./dbController")

            const conn = db.connect("ueis");

            const [card,fields] = conn.execute(`SELECT * FROM cards WHERE card_id= :id;`,[id])

            conn.end();
            console.log(card);

            if (!card) throw new Error("card does not exists");

            return true;

        } catch (error) {
            return error.message;
        }
    }
}

module.exports = cardController;
