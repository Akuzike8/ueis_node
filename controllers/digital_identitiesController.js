class digital_identitiesController
{
    static authenticate = (id) => {
        try {
            const identities = require("../models/digital_identities")
            const identity = identities.findOne({where: {id}})

            if(!identity) throw new Error("Identity does not exist")

            return true;

        } catch (error) {

            res.status(401).render('error',{message: error.message})
        }
    }

    static findIdentity = async (nid) => {
        try {
            const identities = require("../models/digital_identities")
            const identity = await identities.findOne({where:{nid}})

            if (!identity) throw new Error("Identity does not exists");

            return identity;

        } catch (error) {

            res.status(401).render('error',{message: error.message})
        }

    }

    static findUser = (ueis_id) => {
        try {
            const identities = require("../models/digital_identities")

            const identity = identities.findOne({where:{ueis_id}})

            if (!identity) throw new Error("Identity does not exists");

            return identity;

        } catch (error) {

            res.status(401).render('error',{message: error.message})
        }

    }

    static createIdentity = async (req,res) => {
        try {
            const identities = require("../models/digital_identities")
            const { v4: uuidv4 } = require('uuid');
            const id = uuidv4()

            const identity = await identities.create({
                ueis_id: id,
                nid: req.body.NID || null,
                fingerprint_id: req.body.fid || null,
                permit_number: req.body.permit || null,
                passport_number: req.body.passport || null,
                emai: req.body.email || null
            })

            if (!identity) throw new Error("Failed to create Identity");

            res.status(200).render('login',{layout:false});

        } catch (error) {

            res.status(400).render('error',{layout:false,error: error.message,status:400})
        }
    }

    static getMaxFid = async () => {
        try {
            const identities = require("../models/digital_identities")

            const fid = await identities.max('fingerprint_id')

            if (!fid) throw new Error("fingerprint id does not exists");

            return fid;

        } catch (error) {
            return 0;
        }
    }
}

module.exports = digital_identitiesController;
