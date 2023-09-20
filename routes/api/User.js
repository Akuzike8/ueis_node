const express = require("express");
const router = express.Router();
const path = require('path');
const authorize = require('../../middleware/authorize.js')
const {createUser,findUser,updateUser,deleteUser} = require("../../controllers/userController");

//getting user
router.get("/", authorize, findUser);

//creating user
router.post('/', authorize, createUser);

//updating user
router.put("/", authorize, updateUser);

module.exports = router;
