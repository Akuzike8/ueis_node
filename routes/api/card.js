const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cardcontroller = require('../../controllers/cardController');
const authorize = require("../../middleware/authorize");

router.post('/auth', async (req,res) => {
    try {
            var card = req.body.card;

            const privatekey = fs.readFileSync(path.join(__dirname+'../../../keys/private.key')).toString();

            // check for the validity of card no
            const [id,input] = card.split(":")

            //const card_ids = id.split("Time")
            //console.log(card_ids)
            const card_id = await cardcontroller.authenticate(id);

            if(card_id == 0) throw new Error('Invalid card');

            // verifying the card of the data
            var [ueis_id,error] = input.split("T")

            const card_ueis = await cardcontroller.retrive(ueis_id);

            if(id != card_ueis) throw new Error('Fake card');

            jwt.sign(ueis_id,privatekey,{algorithm:'RS256',allowInsecureKeySizes:true},(err,token) => {

                if(err) throw new Error(err.message)

                req.session.token = token

                return res.status(201).redirect('/Auth/fingerprint')
            })


    } catch (error) {

        return res.status(400).json({message:error.message})
    }




})

router.post('/write', authorize, async (req,res) => {
    try {
        const nid = req.body.nid;
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

        res.status(201).json({message:"registered card"})

    } catch (error) {

        return res.status(400).json({message: error.message});
    }
})

module.exports = router;
