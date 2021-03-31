"use strict";

const User = require("../models/user");

exports.getSignupPage = (req, res) => {
    res.render("signup", {
        firstNameError: false,
        lastNameError: false,
        userNameError: false,
        emailError: false,
        DOBError: false,
        cityError: false,
        stateError: false,
        passwordError: false,
        confirmPasswordError: false,
        securityQuestionError: false,
        answerError: false,
        successMessage: "",
        errorMessage: ""
    });
};

exports.getLoginPage = (req, res) => {
    res.render("login", {
        errorMessage: ""
    });
};

exports.saveUser = (req, res) => {
    if (!req.body.txtFirstName || !req.body.txtLastName || !req.body.txtUserName || !req.body.txtEmail || !req.body.txtDOB || !req.body.txtCity || !req.body.txtState ||
        !req.body.txtPassword || !req.body.txtConfirmPassword || !req.body.ddQuestions || !req.body.txtAnswer) {
        res.render("signup", {
            firstNameError: !req.body.txtFirstName,
            lastNameError: !req.body.txtLastName,
            userNameError: !req.body.txtUserName,
            emailError: !req.body.txtEmail,
            DOBError: !req.body.txtDOB,
            cityError: !req.body.txtCity,
            stateError: !req.body.txtState,
            passwordError: !req.body.txtPassword,
            confirmPasswordError: !req.body.txtConfirmPassword,
            securityQuestionError: !req.body.ddQuestions,
            answerError: !req.body.txtAnswer,
            successMessage: "",
            errorMessage: "Please complete the highlighted fields."
        });
        return;
    }
    else if (req.body.txtPassword != req.body.txtConfirmPassword) {
        res.render("signup", {
            firstNameError: false,
            lastNameError: false,
            userNameError: false,
            emailError: false,
            DOBError: false,
            cityError: false,
            stateError: false,
            passwordError: true,
            confirmPasswordError: true,
            securityQuestionError: false,
            answerError: false,
            successMessage: "",
            errorMessage: "Passwords must match."
        });
        return;
    };

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
    });

    newUser.save()
        .then(result => {
            res.render("signup", {
                firstNameError: false,
                lastNameError: false,
                userNameError: false,
                emailError: false,
                DOBError: false,
                cityError: false,
                stateError: false,
                passwordError: false,
                confirmPasswordError: false,
                securityQuestionError: false,
                answerError: false,
                successMessage: "Your account has been successfully created!",
                errorMessage: ""
            })
        })
        .catch(error => {
            if (error) res.send(error);
        });
};

exports.verifyLogin = (req, res) => {
    User.findOne({
        "email": req.body.email
    })
    .where("password", req.body.password)
    .exec()
    .then((theUser) => {
        if (theUser) {
            res.render("home");
        }
        else {
            res.render("login", {
                errorMessage: "Invalid email or password."
            });
        }
    })
    .catch((theError) => {
        res.send(theError);
    });

};//end verifylogin