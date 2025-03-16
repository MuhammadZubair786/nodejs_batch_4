const authModel = require("../Models/authModel")
const userValidate = require("../Validator/authValidate")
const nodemailer = require("nodemailer");
const brcypt = require("bcrypt")
const JWT = require("jsonwebtoken")
require('dotenv').config()

const sk = process.env.jwtSecret


exports.signUp = async (req, res) => {
    try {

        let validateData = await userValidate.validate(req.body)
        if (validateData.error) {
            console.log(validateData.error.details[0].message)
            return res.status(400).json({
                message: validateData.error.details[0].message,
                status: false
            })

        }

        let { email, password } = req.body
        console.log(email)

        let userCheck = await authModel.findOne({ email: email })

        if (userCheck) {

            return res.status(400).json({
                message: "EMAIL ALREADY EXIST ",
                data: userCheck,
                status: false
            })
        }

        const hashPassword = await brcypt.hash(password, 12)
        req.body.password = hashPassword

        const otp = Math.floor(Math.random() * 90000)
        req.body.otpCode = otp


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "mzhassan444@gmail.com",
                pass: "zwtlzopfbluijdel"
            },
            tls: {
                rejectUnauthorized: false
            }

        })

        const info = {
            from: "mzhassan444@gmail.com",
            to: req.body.email,
            subject: "one time password ",
            html: `
            <h1>Verify Account</h1>
        <p>
      your otp is ${otp}</p>
            `

        }

        transporter.sendMail(info, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {

            }
        })


        var user = authModel(req.body)
        user.save()

        var token = JWT.sign({ _id: user._id }, sk, { expiresIn: '2h' })

        return res.status(200).json({
            message: "USER STORE",
            data: user,
            token
        })

    }
    catch (e) {
        res.status(400).json({
            error: e
        })

    }
}

exports.verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body
        if (!otp) {
            return res.status(400).json({
                message: "enter otp code"
            })
        }

        let user = await authModel.findById(req._id)
        if (!user) {
            return res.status(400).json({
                message: "user not found"
            })

        }

        if (user.otpCode != otp) {
            return res.status(400).json({
                message: "invalid otp"
            })
        }

        var userUpdate = await authModel.findByIdAndUpdate(req._id, {
            verify: true
        })
        return res.status(200).json({
            message: "user verify succvessfully",
            data: userUpdate
        })


    } catch (e) {
        return res.status(400).json({
            message: "ERROR",

        })

    }

}
