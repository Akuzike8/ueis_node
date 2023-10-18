const express = require("express");
const router = express.Router();
const path = require('path');
const authorize = require('../../middleware/authorize.js')

router.get("/",authorize,(req,res) => {
   res.render('user_admin');
})

module.exports = router;
