"use strict";

const User = require("../models/user");
const passport = require("passport");
//const { body } = require("express-validator/check");

let getUserParams = body => {
    return {
        name:{
            first: body.first,
            last: body.last,
        },
        userName: body.userName,
        email: body.email,
        gender: body.gender,
        DOB: body.DoB,
        city: body.city,
        state: body.state,
        biography: body.bio,
        securityQuestion: body.ddQuestions,
        securityAnswer: body.secAnswer,
    };
};

// reminder to uncomment flashes at some point
module.exports = {
    getLoginPage: (req,res) =>{

        res.render("users/login",{
            errorMessage: ""
        });
    },
    getSignupPage: (req,res) =>{
        res.render("users/signup");
    },
    create: (req, res, next) => {
        if(req.skip) return next();
        
        let newUser = getUserParams(req.body);


        User.register(newUser, req.body.password, (error, user)=> {
            if(user){
                req.flash("success", "User Account successfully created!");
                console.log("Successfully created user account!");
                res.locals.redirect = "/home";
                next();
            }
            else{
                req.flash("error",`failed to create user account: ${error.message}`);
                console.log(`failed to make user Account: ${error.message}`);
                res.locals.redirect = "/users/new";
                next();
            }
        });
    },

    validate: (req,res,next) => {

        /*req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true,
        }).trim();*/

        req.check("first").notEmpty();
        req.check("last").notEmpty();
        //req.check("username").notEmpty();
        req.check("gender").notEmpty();
        req.check("DoB").notEmpty();
        req.check("state").notEmpty();
        req.check("ddQuestions").notEmpty();
        req.check("secAnswer").notEmpty();

        //req.check("email","email is not valid!").isEmail();
        req.check("password","password cannot be empty").notEmpty();
        req.getValidationResult().then((error) => {
            if(!error.isEmpty()){
                let messages = error.array().map( e => e.msg);
                //req.flash("error",messages.join(" and "));
                console.log("very nice word error messages:",messages);
                req.skip = true;
                res.locals.redirect = "/users/signup";
                next();
            }
            else{
                console.log("passed validation");
                next();
            }
        });
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Login failed! check your email or password! ",
        successRedirect: "/home",
        sucessFlash: "Logged in!",
    }),

    logout : (req,res,next) => {
        req.logout();
        //req.flash("success","you have been logged out!");
        res.locals.redirect = "/";
        next();
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },

    edit: (req, res, next) => {
        let userId = req.params.id;
        
        User.findById(userId)
            .then(user => {
                res.render("users/edit", { user: user });// this doesnt exist yet
            })
            .catch(error => {
                
                console.log(`error fetching user by id: ${error.message}`);
                next(error);
            })
    },

    update: (req, res, next) => {
        if(req.skip) return next();


        let userId = req.params.id;
        User.findOneAndUpdate(userId, {
            name:{
                first: body.first,
                last: body.last,
            },
            //userName: body.userName,
            email: body.email,
            gender: body.gender,
            DOB: body.DoB,
            city: body.city,
            state: body.state,
            biography: body.bio,
            securityQuestion: body.ddQuestions,
            securityAnswer: body.secAnswer,

        })
            .then(user => {
                res.locals.user = user;
                res.locals.redirect = `/users/${user._id}`;// doesnt exist yet
                
                next();

            })
            .catch(error => {
                
                console.log(`error fetching user by id: ${error.message}`);
                next();
            })
    },

    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/users";// does exist yet
                next();
            })
            .catch(error => {
                console.log(`error fetching user by id: ${error.message}`);
            })
    }



};// end of module.exports 









/*
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


*/