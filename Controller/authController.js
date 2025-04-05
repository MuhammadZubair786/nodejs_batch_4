const authModel = require("../Models/authModel");
const userValidate = require("../Validator/authValidate");
const nodemailer = require("nodemailer");
const brcypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier"); //read buffer format,
const profilemodel = require("../Models/profilemodel");

// 1000byte

//cpanel,aws

const sk = process.env.jwtSecret;

exports.signUp = async (req, res) => {
  try {
    let validateData = await userValidate.validate(req.body);
    if (validateData.error) {
      console.log(validateData.error.details[0].message);
      return res.status(400).json({
        message: validateData.error.details[0].message,
        status: false,
      });
    }

    let { email, password } = req.body;
    console.log(email);

    let userCheck = await authModel.findOne({ email: email });

    if (userCheck) {
      return res.status(400).json({
        message: "EMAIL ALREADY EXIST ",
        data: userCheck,
        status: false,
      });
    }

    const hashPassword = await brcypt.hash(password, 12);
    req.body.password = hashPassword;

    const otp = Math.floor(Math.random() * 90000);
    req.body.otpCode = otp;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mzhassan444@gmail.com",
        pass: "zwtlzopfbluijdel",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = {
      from: "mzhassan444@gmail.com",
      to: req.body.email,
      subject: "one time password ",
      html: `
            <h1>Verify Account</h1>
        <p>
      your otp is ${otp}</p>
            `,
    };

    transporter.sendMail(info, (err, result) => {
      if (err) {
        console.log(err);
      } else {
      }
    });

    var user = authModel(req.body);
    user.save();

    var token = JWT.sign({ _id: user._id }, sk, { expiresIn: "2h" });

    return res.status(200).json({
      message: "USER STORE",
      data: user,
      token,
    });
  } catch (e) {
    res.status(400).json({
      error: e,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({
        message: "enter otp code",
      });
    }

    let user = await authModel.findById(req._id);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    if (user.otpCode != otp) {
      return res.status(400).json({
        message: "invalid otp",
      });
    }

    var userUpdate = await authModel.findByIdAndUpdate(req._id, {
      verify: true,
    });
    return res.status(200).json({
      message: "user verify succvessfully",
      data: userUpdate,
    });
  } catch (e) {
    return res.status(400).json({
      message: "ERROR",
    });
  }
};

exports.completeProfile = async (req, res) => {
  try {
    let user = await authModel.findById(req._id);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    if (req.file == undefined) {
      return res.status(400).json({
        message: "Please select pic",
        status: false,
      });
    }
    console.log(req.file);

    const folderName = "AuthPicture";
    const qualityLevel = "auto:low";

    let stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: folderName,
        quality: qualityLevel,
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            error: "Failed to upload image to Cloudinary",
            details: error,
          });
        }

        var body = {
          age: req.body.age,
          gender: req.body.gender,
          image: result.secure_url,
          authId: req._id, //auth
        };

        var profileData = await profilemodel(body);
        profileData.save();

        await authModel.findOneAndUpdate(
          {
            _id: req._id,
          },
          {
            profileId: profileData._id, //
          }
        );

        res.status(200).json({
          message: "Picture or data store",
          data: profileData,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (e) {
    res.status(400).json({
      message: "invalid",
      e: e,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "invalid data",
      });
    }

    var userCheck = await authModel
      .findOne({ email: email })
      .populate("profileId");
    console.log(userCheck);
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

      var token = JWT.sign({ _id: userCheck._id }, sk, { expiresIn: "2h" });

      return res.status(200).json({
        message: "login",
        data: userCheck,
        token
      });
    }
  } catch (e) {}
};
