var express = require("express")
var router = express.Router()
const bcrypt = require("bcrypt")
const pool = require("../db")
const nodemailer = require('nodemailer')

router.get('/', (req, res) => {
    if (req.session.loggedin != true) res.render('Register')
    else res.redirect('/user')
})

router.post('/', async(req, res) => {
    let name = req.body.inputName
    let username = req.body.inputUsername
    let email = req.body.inputEmail
    let password = req.body.inputPassword
    let hashedPass = await hashPassword(password)
    let verifCode = Math.floor(Math.random() * 1000000)
    let query = "INSERT INTO TEACHER (NAMA, USERNAME, EMAIL, PASSWORD, VERIFCODE) VALUES ('" + name + "', '" + username + "', '" + email + "', '" + hashedPass + "', " + verifCode + ")"
    pool.query(query, (err, r) => {
        if (err) res.send("failed")
        else {
            sendEmail(email, verifCode)
            res.send("success")
        }
    })
})

async function sendEmail(email, verifCode) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: '', // generated ethereal user
            pass: '', // generated ethereal password
        },
    });

    // send mail with defined transport object
    transporter.sendMail({
        from: '"Shihan Corp" <shihancorp@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Shihan Verification Email", // Subject line
        text: "", // plain text body
        html: "<p>Your Verification Code : </p><br><b>" + verifCode + "</b>", // html body
    });
}

function hashPassword(password) {
    return new Promise(resolve => {
        bcrypt.hash(password, 10, function(err, hash) {
            resolve(hash)
        });
    })
}


module.exports = router
