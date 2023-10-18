const express = require("express");
const router = express.Router();
const path = require('path');
const {generateToken, verifyToken, refreshToken} = require('../../controllers/authController')
const authorize = require('../../middleware/authorize.js')

// Authentication pages

router.get('/register',(req,res) => {
   res.render('register',{layout:false})
})

router.get('/card',(req,res) => {
   res.render('login',{layout:false})
})

router.get('/card_reg',(req,res) => {
   res.render('card_reg')
})

router.get('/fingerprint',authorize,(req,res) => {
   res.render('fingerprint_auth',{layout:false})
})

router.get('/fingerprint_enroll',(req,res) => {
   res.render('fingerprint_enroll',{layout:false})
})

router.get('/reset',(req,res) => {
   res.render('reset',{layout:false})
})

router.get('/reset_password',(req,res) => {
   res.render('reset_password',{layout:false})
})

// Authencation functions
router.get('/token', generateToken)

router.post('/verifyToken', verifyToken)

router.post('/refreshToken', refreshToken)

module.exports = router;
