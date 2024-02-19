let router = require('express').Router()
let TableStructure = require('../TableSchema/Schema')
let jwt = require('jsonwebtoken')
let middleware = require('../middleware')

//User Register
router.post('/register', async (req, res) => {
    try {
        let addData = await TableStructure(req.body)
        let exist = await TableStructure.findOne({ email: req.body.email })
        if (exist) {
            res.status(400).json("User Already Exist")
        }
        if (addData.password === addData.confirmpassword) {
            await addData.save()
            res.status(201).json("User Registered Successfully")
        }
        else {
            res.status(404).json("Passwords Not Matched")
        }
    }
    catch (err) {
        console.log(err.message)
    }
})


//User Login
router.post('/login', async (req, res) => {
    try {
        let data = new TableStructure(req.body)
        let isThere = await TableStructure.findOne({ email: req.body.email })
        if (!isThere) {
            res.status(201).send("User Not Found")
        }
        if (isThere.password !== data.password) {
            res.status(201).json("Invalid Credentials")
        }

        let payload = {
            user: {
                id: isThere.id
            }
        }
        jwt.sign(payload, 'protected', { expiresIn: 3600000 },
            (err, token) => {
                if (err) {
                    throw err
                }
                else {
                    res.json({ token })
                }
            }
        )
    }
    catch (err) {
        res.status(404).json('server error')
    }
})

//MyProfile
router.get('/myprofile', middleware, async (req, res) => {
    try {
        let unte = await TableStructure.findById(req.user.id)
        if (!unte) {
            res.status(404).json('User Not Found')
        }
        else {
            res.status(201).json(unte)
        }
    }
    catch (err) {
        res.status(404).json('server error')
    }
})

module.exports = router
