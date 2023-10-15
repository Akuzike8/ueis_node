const express = require("express");
const router = express.Router();
const path = require('path');
const authorize = require('../../middleware/authorize.js')

router.get("/",authorize,(req,res) => {
   return res.sendFile(path.join(__dirname+'../../../templates/user_dash.html'))
})
module.exports = router;
