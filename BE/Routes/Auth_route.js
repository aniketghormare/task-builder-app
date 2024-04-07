

const express = require('express');
const AuthModel = require('../model/Auth_model');

const Authrouter = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

Authrouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await AuthModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.secretkey)

                    res.json({ msg: "login successful", token })

                }
            })
        } else {
            res.json({ msg: "user not found" })
        }
    } catch (error) {
        res.json({ msg: error })
    }
});

Authrouter.post('/signup', async (req, res) => {
    const { name, email, password } = req.body

    const data = AuthModel.findOne({ email })

    if (data.email == email) {
        res.json({ msg: "User already exist, please login" })
    }

    try {
        bcrypt.hash(password, 5, async (err, hash) => {

            if (err) {
                res.json({ msg: err })
            } else {
                const user = await AuthModel({ name, email, password: hash })
                await user.save()
                res.json({ msg: "user registered" })
            }
        })

    } catch (error) {
        res.json({ msg: error })
    }
});





module.exports = Authrouter;
