const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let otpStore = {};


// ================= FORGOT PASSWORD =================

router.post("/forgot-password", async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "Email not found"
      });

    }

    // OTP GENERATE
    const otp =
      Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    otpStore[email] = otp;

    // EMAIL SENDER
    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS

        }

      });

    // SEND EMAIL
    await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "OTP For Reset Password",
  text: `Your OTP is ${otp}`
  });

    res.json({
      message: "OTP sent to email"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// ================= VERIFY OTP =================

router.post("/verify-otp", async (req, res) => {

  const { email, otp } = req.body;

  if (otpStore[email] === otp) {

    res.json({
      success: true
    });

  } else {

    res.status(400).json({
      message: "Invalid OTP"
    });

  }

});


// ================= RESET PASSWORD =================

router.post("/reset-password", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const hashed =
      await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(

      { email },

      {
        password: hashed
      }

    );

    delete otpStore[email];

    res.json({
      message:
        "Password reset successful"
    });

  } catch (err) {

    res.status(500).json({
      message: "Error"
    });

  }

});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

// ================= LOGIN =================


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid password",
      });
    }

    // IMPORTANT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;