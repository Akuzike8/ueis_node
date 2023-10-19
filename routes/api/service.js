const express = require("express");
const router = express.Router();
const path = require('path');
const authorize = require('../../middleware/authorize.js');
const {verifyOTP} = require('../../controllers/authController.js')

router.post('/banks', async(req,res) => {
    let token = req.body.otp

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

    if(!state.valid) res.status(302).redirect('/service/otp/banks')

    res.render('banks',{name,phone,ueis_id})
 })

router.post('/E-Payment', async(req,res) => {
    let token = req.body.otp

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

    if(!state.valid) res.status(302).redirect('/service/otp/E-Payment')

    res.render('E-Payment',{name,phone,ueis_id})
})

router.post('/E-Health', async (req,res) => {
    let token = req.body.otp

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

    if(!state.valid) res.status(302).redirect('/service/otp/E-Health')

    res.render('E-Health',{name,phone,ueis_id})
 })

router.post('/E-vote', async (req,res) => {
    let token = req.body.otp

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

    if(!state.valid) res.status(302).redirect('/service/otp/E-vote')

    res.render('E-vote',{name,phone,ueis_id})
})

router.get('/digital_signature',verifyOTP, async(req,res) => {
    let token = req.body.otp

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

    if(!state.valid) res.status(302).redirect('/service/otp/digital_signature')

    res.render('digital_signature',{name,phone,ueis_id})
})

router.get('/otp/:service', (req,res) => {
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
