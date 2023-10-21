class third_partiesController
{
    static findThirdParty = async (id) => {
        try {
            const third_parties = require("../models/third_parties")

            const third_party = await third_parties.findOne({where:{id}})

            if (!third_party) throw new Error("service does not exists");

            return third_party;

        } catch (error) {

            return {error: error.message}
        }
    }

    static getAllThirdParties = async () => {
        try {
            const third_parties = require("../models/third_parties")

            const third_party = await third_parties.findAll()

            if (!third_party) throw new Error("third party does not exists");

            return third_party;

        } catch (error) {
            return {error:error.message}
        }
    }

    static countThirdParties = async () => {
        try {
            const third_parties = require("../models/third_parties")

            const third_party = await third_parties.count()

            if (!third_party) throw new Error("third party does not exists");

            return third_party;

        } catch (error) {

            return 0;
        }
    }
}

module.exports = third_partiesController
