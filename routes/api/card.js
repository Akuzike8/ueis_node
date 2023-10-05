const express = require("express");
const crypto = require('crypto');
const RSA = require('node-rsa');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cardcontroller = require('../../controllers/cardController')

router.post('/auth',(req,res) => {
    try {
            var card = req.body.card;

            const publickey = fs.readFileSync(path.join(__dirname+'../../../keys/public.key')).toString();

            // check for the validity of card no
            const [id,input] = card.split(":");
            console.log(input);
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

router.post('/write', (req,res) => {
    try {
        const nid = req.body.nid;
        const issued = new Date().toISOString().split('T')[0];
        var data = nid + "." + issued + ".";

        const privateKey = fs.readFileSync(path.join(__dirname+'../../../keys/private.key')).toString();

        // sign the hash digest
        jwt.sign({data}, privateKey, { algorithm: 'RS256', expiresIn: '8w', allowInsecureKeySizes: true },(err,token) => {

            if (err) res.status(400).json({message:err.message})

            token += '>';

            res.status(201).json({token})
        });


    } catch (error) {

        return res.status(400).json({message: error.message});
    }

})

module.exports = router;
