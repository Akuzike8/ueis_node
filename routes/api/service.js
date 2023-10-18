const express = require("express");
const router = express.Router();
const path = require('path');
const authorize = require('../../middleware/authorize.js')

router.get('/banks',(req,res) => {
    res.render('banks')
 })

router.get('/E-Payment',(req,res) => {
    res.render('E-Payment')
})

router.get('/E-Health',(req,res) => {
    res.render('E-Health')
 })

router.get('/E-vote',(req,res) => {
    res.render('E-vote')
})

router.get('/digital_signature',(req,res) => {
    res.render('digital_signature')
})

router.get('/otp',(req,res) => {
    res.render('otp',{layout:false})
 })

module.exports = router;
