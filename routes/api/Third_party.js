const express = require("express");
const router = express.Router();
const path = require('path');
const [authorize,admin_authorize] = require('../../middleware/authorize.js')

router.post("/add",admin_authorize)

router.put("/update",admin_authorize)
