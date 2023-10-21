class serviceController
{
    static findService = async (id) => {
        try {
            const services = require("../models/digital_identities")

            const service = await services.findOne({where:{id}})

            if (!service) throw new Error("service does not exists");

            return service;

        } catch (error) {

            return {error: error.message}
        }
    }

    static getAllServices = async () => {
        try {
            const services = require("../models/services")

            const service = await services.findAll()

            if (!service) throw new Error("service does not exists");

            return service;

        } catch (error) {

            return {error:error.message}
        }
    }

    static countService = async () => {
        try {
            const services = require("../models/services")

            const service = await services.count()

            if (!service) throw new Error("service does not exists");

            return service;

        } catch (error) {

            return 0;
        }
    }
}

module.exports = serviceController
