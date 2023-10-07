const express = require("express");
const crypto = require('crypto');
const RSA = require('node-rsa');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cardcontroller = require('../../controllers/cardController');
const digital_identities = require("../../models/digital_identities");

router.post('/auth',(req,res) => {
    try {
            var card = req.body.card;

            const publickey = fs.readFileSync(path.join(__dirname+'../../../keys/public.key')).toString();

            // check for the validity of card no
            const [id,input] = card.split(":");

            const card_id = cardcontroller.authenticate(id);

            if(card_id == 0) throw new Error('Invalid card');

            // verifying the card of the data
            jwt.verify(input,publickey,{algorithm: 'RS256'},(err,decoded) =>{

                if (err) res.status(400).json({message:err.message})

            });

            res.status(200).json({message:"valid card"})


    } catch (error) {

        console.error(error.message);
    }




})

router.post('/write', async (req,res) => {
    try {
        const nid = req.body.nid;
        const issued = new Date().toISOString().split('T')[0];
        const {findIdentity} = require("../../controllers/digital_identitiesController")
        const identity = await findIdentity(nid);
        const ueis_id = identity.ueis_id

        var data = ueis_id + ">";

        res.status(201).json({data})

    } catch (error) {

        return res.status(400).json({message: error.message});
    }

})

router.post('/register', async (req,res) => {
    try {
       const payload = req.body.payload
       const [cid,ueis_id] = payload.split(":")

        // verifying the card of the data
        cardcontroller.register(cid,ueis_id)

        res.status(200).json({message:"valid card"})

    } catch (error) {

        return res.status(400).json({message: error.message});
    }
})

module.exports = router;
