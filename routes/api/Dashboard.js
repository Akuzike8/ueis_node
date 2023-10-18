const express = require("express");
const router = express.Router();
const path = require('path');
const authorize = require('../../middleware/authorize.js')
const {findUser, findIdentity} = require('../../controllers/digital_identitiesController.js')

router.get("/",authorize,async (req,res) => {
   const ueis_id = res.locals.decoded

   const users = require('../../models/citizens')

   const identity = await findUser(ueis_id)

   const user = await users.findOne({where:{nid: identity.nid}})
   let {firstname,othername, surname, phone, sex, dob} = user
   let name = firstname.concat([" ",surname])
   res.render('user_dash', {name});
})

router.get("/user_profile",authorize,(req,res) => {
   res.render('user_profile');
})

router.get("/help",authorize,(req,res) => {
   res.render('help');
})

router.get("/about",authorize,(req,res) => {
   res.render('about');
})

router.get("/contact",authorize,(req,res) => {
   res.render('contact');
})

router.get("/otp",authorize,(req,res) => {
   res.render('otp');
})
module.exports = router;
