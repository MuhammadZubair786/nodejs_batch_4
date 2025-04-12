const authModel = require("../Models/authModel");
const brcypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const sk = process.env.jwtSecret;
exports.Adminlogin = async (req, res) => {
//   try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "invalid data",
      });
    }

    var userCheck = await authModel
      .findOne({ email: email })


    if (!userCheck) {
      return res.status(400).json({
        message: "user not regsister",
      });
    } else {
      var checkPassword = await brcypt.compare(password, userCheck.password);
      if (!checkPassword) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }

      if (userCheck.verify == false) {
        return res.status(200).json({
          message: "Pleaae first verify your account",
        });
      }

      var token = JWT.sign({ _id: userCheck._id,type:userCheck.userType }, sk, { expiresIn: "2h" });

      return res.status(200).json({
        message: "login admin",
        data: userCheck,
        token
      });
    }
//   } catch (e) { }
};

exports.getAllUsers = async (req, res) => {
    //   try {
    // var piplines = [
    //     {
    //       '$match': {
    //         'userType': 'user'
    //       }
    //     }
    //   ]

    //   var users =await authModel.aggregate(piplines)

    var users =await  authModel.find({userType:"user"})
      res.status(200).json({
        data : users
      })
      
        // }
    //   } catch (e) { }
    };