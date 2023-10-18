const express = require("express");
const router = express.Router();
const path = require('path');
const authorize = require('../../middleware/authorize.js')

router.get("/",authorize,(req,res) => {
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
   
   res.render('user_admin');
})

module.exports = router;
