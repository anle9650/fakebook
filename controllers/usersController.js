"use strict";

const User = require("../models/user");

var formErrors = {
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
};

exports.getSignupPage = (req, res) => {
    res.render("signup", formErrors);
};

exports.getLoginPage = (req, res) => {
    res.render("login", {
        errorMessage: ""
    });
};

exports.saveUser = (req, res) => {
    formErrors.firstNameError = !req.body.txtFirstName;
    formErrors.lastNameError = !req.body.txtLastName;
    formErrors.userNameError = !req.body.txtUserName;
    formErrors.emailError = !req.body.txtEmail;
    formErrors.DOBError = !req.body.textDOB;
    formErrors.cityError = !req.body.txtCity;
    formErrors.stateError = !req.body.txtState;
    formErrors.passwordError = !req.body.txtPassword;
    formErrors.confirmPasswordError = !req.body.txtConfirmPassword;
    formErrors.securityQuestionError = !req.body.ddQuestions;
    formErrors.answerError = !req.body.txtAnswer;

    console.log("doberror:  ",formErrors.DOBError);
    if (formErrors.firstNameError || formErrors.lastNameError || formErrors.userNameError || formErrors.emailError || formErrors.DOBError || formErrors.cityError || formErrors.stateError ||
        formErrors.passwordError || formErrors.confirmPasswordError || formErrors.securityQuestionError || formErrors.answerError) {
        formErrors.successMessage = "";
        formErrors.errorMessage = "Please complete the highlighted fields.";
        res.render("signup", formErrors);
        return;
    }
    else if (req.body.txtPassword != req.body.txtConfirmPassword) {
        formErrors.successMessage = "";
        formErrors.errorMessage = "Passwords must match.";
        res.render("signup", formErrors);
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
            formErrors.successMessage = "Your account has been successfully created!";
            formErrors.errorMessage = "";
            res.render("signup", formErrors)
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