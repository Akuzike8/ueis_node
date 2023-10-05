class userController
{
    users = require("../models/users")
    db = require("./dbController")

    //methods

    //getting all users
    static findUser = (req,res) => {
        try {
            const db = require("./dbController")

            const conn = db.connect("ueis");

            const [user,fields] = conn.execute(`SELECT * FROM users WHERE ueis_id= :id;`,[req.body.id])

            conn.end();

            if (!user) throw new Error("User does not exists");

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
            const { v4: uuidv4 } = require('uuid');
            const id = uuidv4()

            const conn = db.connect("ueis");

            const payload = {
                id,
                nid: req.body.nid,
                permit: req.body.permit,
                passport: req.body.passport
            }

            const user = conn.execute(`INSERT INTO digital_identities(id,nid,permit_number,passport_number) VALUES(:id,:nid,:permit,:passport);`,payload);

            conn.end();

            if (!user) throw new Error("Failed to create User");

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

            const conn = db.connect("ueis");

            const user = conn.execute(`DELETE FROM users WHERE ueis_id = :id;`,[req.body.id]);

            conn.end()

            if (!user) throw new Error("User does not exists");

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

            const conn = db.connect("ueis");

            const user = conn.execute(`UPDATE users`);

            conn.end()

            if (!user) throw new Error("User does not exists");


            res.status(201).json(user);

        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}

module.exports = userController;
