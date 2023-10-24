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

    static createService = async (req,res) => {
        try {
            const services = require("../models/services")

            const service = await services.create({
                third_party_id: req.body.third_party_id,
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                status: req.body.status
            })

            if (!service) throw new Error("Failed to create service");

            return service;

        } catch (error) {
            console.log(error)
            return {error: error.message}
        }
    }
}

module.exports = serviceController
