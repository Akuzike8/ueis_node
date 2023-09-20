class userController
{
    users = require("../models/users")
    db = require("./dbController")

    //methods

    //getting all users
    static findUser = async (req,res) => {
        try {
            const users = require("../models/users")
            const db = require("./dbController")

            db.connect();

            const exists = await users.exists({email: req.body.email});

            if (!exists) throw new Error("User does not exists");

            const user = await users.find();

            res.status(201).json(user);

        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }

    //creating user
    static createUser = async (req, res) => {
        try {
            const users = require("../models/users")
            const db = require("./dbController")

            db.connect();

            const exists = await users.exists({email: req.body.email});

            if (exists) throw new Error("User already exists");

            const user = await users.create({
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                password: req.body.password,
                phone: req.body.phone
            });

            res.status(201).json(user);


        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }

    //deleting user
    static deleteUser = async (req,res) => {
        try {
            const users = require("../models/users")
            const db = require("./dbController")

            db.connect();

            const exists = await users.exists({email: req.body.email});

            if (!exists) throw new Error("User does not exists");

            const user = await users.deleteMany({email: req.body.email});

            res.status(201).json(user);

        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }

    //updating user
    static updateUser = async (req,res) => {
        try {
            const users = require("../models/users")
            const db = require("./dbController")

            db.connect();

            const exists = await users.exists({email: req.body.email});

            if (!exists) throw new Error("User does not exists");

            const user = await users({email: req.body.email});

            res.status(201).json(user);

        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}

module.exports = userController;
