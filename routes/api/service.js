const express = require("express");
const router = express.Router();
const path = require('path');
const authorize = require('../../middleware/authorize.js');
const {verifyOTP} = require('../../controllers/authController.js')

router.get('/banks', async(req,res) => {
    let token = req.query.otp_num_1 + req.query.otp_num_2 + req.query.otp_num_3 + req.query.otp_num_4 + req.query.otp_num_5 + req.query.otp_num_6

    const payload = {
        name: req.session.name,
        role: req.session.role,
        ueis_id: req.session.ueis_id,
        nid: req.session.nid,
        phone: req.session.phone,
        sex: req.session.sex,
        dob: req.session.dob,
        status: req.session.status
     }

    let {name, role, ueis_id, nid, phone, sex, dob, status} = payload

    let state = await verifyOTP(token,ueis_id)
    console.log(state)

    if(!state.valid) res.status(302).redirect('/service/otp/banks')

    res.render('banks',{name,phone,ueis_id})
 })

router.get('/E-Payment',(req,res) => {
    const payload = {
        name: req.session.name,
        role: req.session.role,
        ueis_id: req.session.ueis_id,
        nid: req.session.nid,
        phone: req.session.phone,
        sex: req.session.sex,
        dob: req.session.dob,
        status: req.session.status
     }

    let {name, role, ueis_id, nid, phone, sex, dob, status} = payload

    res.render('E-Payment',{name,phone,ueis_id})
})

router.get('/E-Health',(req,res) => {
    const payload = {
        name: req.session.name,
        role: req.session.role,
        ueis_id: req.session.ueis_id,
        nid: req.session.nid,
        phone: req.session.phone,
        sex: req.session.sex,
        dob: req.session.dob,
        status: req.session.status
     }

    let {name, role, ueis_id, nid, phone, sex, dob, status} = payload
    res.render('E-Health',{name,phone,ueis_id})
 })

router.get('/E-vote',(req,res) => {
    const payload = {
        name: req.session.name,
        role: req.session.role,
        ueis_id: req.session.ueis_id,
        nid: req.session.nid,
        phone: req.session.phone,
        sex: req.session.sex,
        dob: req.session.dob,
        status: req.session.status
     }

    let {name, role, ueis_id, nid, phone, sex, dob, status} = payload
    res.render('E-vote',{name,phone,ueis_id})
})

router.get('/digital_signature',authorize,verifyOTP,(req,res) => {
    const payload = {
        name: req.session.name,
        role: req.session.role,
        ueis_id: req.session.ueis_id,
        nid: req.session.nid,
        phone: req.session.phone,
        sex: req.session.sex,
        dob: req.session.dob,
        status: req.session.status
     }

    let {name, role, ueis_id, nid, phone, sex, dob, status} = payload

    res.render('digital_signature',{name,phone,ueis_id})
})

router.get('/otp/:service',(req,res) => {
    let service = req.params.service
    let {generateOTP} = require('../../controllers/authController.js')
    let {generateCode} = require('../../controllers/codesController.js')

    const payload = {
        name: req.session.name,
        role: req.session.role,
        ueis_id: req.session.ueis_id,
        nid: req.session.nid,
        phone: req.session.phone,
        sex: req.session.sex,
        dob: req.session.dob,
        status: req.session.status
     }

    let {name, role, ueis_id, nid, phone, sex, dob, status} = payload
    let otp = generateOTP(phone,generateCode(),ueis_id)

    res.render('otp',{phone,service,layout:false})
 })

module.exports = router;
