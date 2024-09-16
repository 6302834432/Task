const express = require('express')
const router = express.Router()
const handler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../Models/UserModel')
router.post('/login', handler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    let user = await User.findOne({ email })

    console.log(user)
    if (user) {
        const passwordCompare = bcrypt.compare(password, user.password)
        if (passwordCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }

            const token = jwt.sign(data, process.env.JWT_SECRET)
            res.json({
                success: true,
                user: user,
                token:token
            })
        }
        else {
            res.json({ success: false, error: "Wrong password" })
        }
    }
    else {
        res.json({ success: false, error: "Wrong Email Id" })
    }
}))
module.exports = router