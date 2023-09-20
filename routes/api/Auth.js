const express = require("express");
const router = express.Router();
const path = require('path');
const {generateToken, verifyToken, refreshToken} = require('../../controllers/authController')

// Authentication pages
router.get('/login',(req,res) => {
   return res.sendFile(path.join(__dirname+'../../../templates/login.html'))
})

router.get('/register',(req,res) => {
   return res.sendFile(path.join(__dirname+'../../../templates/register.html'))
})

router.get('/fingerprint',(req,res) => {
   return res.sendFile(path.join(__dirname+'../../../templates/fingerprint_auth.html'))
})

router.get('/reset',(req,res) => {
   return res.sendFile(path.join(__dirname+'../../../templates/reset.html'))
})

router.get('/reset_password',(req,res) => {
   return res.sendFile(path.join(__dirname+'../../../templates/reset_password.html'))
})

// Authencation functions
router.get('/token', generateToken)

router.post('/verifyToken', verifyToken)

router.post('/refreshToken', refreshToken)

module.exports = router;
