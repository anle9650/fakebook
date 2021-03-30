"use strict";

const User = require("../models/user");

exports.getSignupPage = (req, res) => {
    res.render("signup");
};

exports.getLoginPage = (req, res) => {
    res.render("login");
};

exports.saveUser = (req, res) => {
    let newUser = new User({
        firstName: req.body.txtFirstName,
        lastName: req.body.txtLastName,
        userName: req.body.txtUserName,
        email: req.body.txtEmail,
        gender: req.body.gender,
        DOB: req.body.txtDOB,
        city: req.body.txtCity,
        state: req.body.txtState,
        biography: req.body.txtBio,
        password: req.body.txtPassword,
        securityQuestion: req.body.ddQuestions,
        answer: req.body.txtAnswer
    })

    newUser.save();
};

exports.verifyLogin = (req, res) => {

};