const express = require("express");
const router = express.Router();
const path = require('path');
const authorize = require('../../middleware/authorize.js')

router.get('/banks',(req,res) => {
    const payload = {
        name: req.session.name,
        role: req.session.role,
        ueis_id: req.session.id,
        nid: req.session.nid,
        phone: req.session.phone,
        sex: req.session.sex,
        dob: req.session.dob,
        status: req.session.status
     }

    let {name, role, ueis_id, nid, phone, sex, dob, status} = payload

    res.render('banks')
 })

router.get('/E-Payment',(req,res) => {
    const payload = {
        name: req.session.name,
        role: req.session.role,
        ueis_id: req.session.id,
        nid: req.session.nid,
        phone: req.session.phone,
        sex: req.session.sex,
        dob: req.session.dob,
        status: req.session.status
     }

    let {name, role, ueis_id, nid, phone, sex, dob, status} = payload

    res.render('E-Payment')
})

router.get('/E-Health',(req,res) => {
    const payload = {
        name: req.session.name,
        role: req.session.role,
        ueis_id: req.session.id,
        nid: req.session.nid,
        phone: req.session.phone,
        sex: req.session.sex,
        dob: req.session.dob,
        status: req.session.status
     }

    let {name, role, ueis_id, nid, phone, sex, dob, status} = payload
    res.render('E-Health')
 })

router.get('/E-vote',(req,res) => {
    const payload = {
        name: req.session.name,
        role: req.session.role,
        ueis_id: req.session.id,
        nid: req.session.nid,
        phone: req.session.phone,
        sex: req.session.sex,
        dob: req.session.dob,
        status: req.session.status
     }

    let {name, role, ueis_id, nid, phone, sex, dob, status} = payload
    res.render('E-vote')
})

router.get('/digital_signature',(req,res) => {
    const payload = {
        name: req.session.name,
        role: req.session.role,
        ueis_id: req.session.id,
        nid: req.session.nid,
        phone: req.session.phone,
        sex: req.session.sex,
        dob: req.session.dob,
        status: req.session.status
     }

    let {name, role, ueis_id, nid, phone, sex, dob, status} = payload

    res.render('digital_signature')
})

router.get('/otp/:service',(req,res) => {
    let service = req.params.service

    const payload = {
        name: req.session.name,
        role: req.session.role,
        ueis_id: req.session.id,
        nid: req.session.nid,
        phone: req.session.phone,
        sex: req.session.sex,
        dob: req.session.dob,
        status: req.session.status
     }

    let {name, role, ueis_id, nid, phone, sex, dob, status} = payload

    res.render('otp',{phone,layout:false})
 })

module.exports = router;
