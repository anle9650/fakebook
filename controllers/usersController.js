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
        securityAnswer: body.securityAnswer,
    };
};

// reminder to uncomment flashes at some point
module.exports = {
    getLoginPage: (req,res) =>{

        res.render("users/login",{
            errorMessage: ""
        });
    },
    new: (req,res) =>{
        res.render("users/new");
    },
    create: (req, res, next) => {
        if(req.skip) return next();
        
        let newUser = getUserParams(req.body);


        User.register(newUser, req.body.password, (error, user)=> {
            if(user){
                req.flash("success", "User Account successfully created!");
                console.log("Successfully created user account!");
                res.locals.redirect = "/users/login";
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

        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();
        req.check("email", "Email is invalid").isEmail();
        req.check("first", "First name cannot be empty").notEmpty();
        req.check("last", "Last name cannot be empty").notEmpty();
        req.check("userName", "Username cannot be empty").notEmpty();
        req.check("gender", "Gender cannot be empty").notEmpty();
        req.check("DoB", "Date of birth cannot be empty").notEmpty();
        req.check("state", "State cannot be empty").notEmpty();
        req.check("ddQuestions", "Security question cannot be empty").notEmpty();
        req.check("securityAnswer", "Answer cannot be empty").notEmpty();
        req.check("password","password cannot be empty").notEmpty();
        req.check("confirmPassword", "Passwords must match.").equals(req.body.password);

        req.getValidationResult().then((error) => {
            if(!error.isEmpty()){
                let messages = error.array().map( e => e.msg);
                req.flash("error",messages.join(" and "));
                req.skip = true;
                res.locals.redirect = "/users/new";
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
        successFlash: "Logged in!",
    }),

    logout : (req,res,next) => {
        req.logout();
        req.flash("success","you have been logged out!");
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
                res.render("users/edit", { user: user });
            })
            .catch(error => {
                
                console.log(`error fetching user by id: ${error.message}`);
                next(error);
            })
    },

    update: (req, res, next) => {
        if(req.skip) return next();

        let userId = req.params.id,
            userParams = getUserParams(req.body);

        User.findOneAndUpdate(userId, {
            $set: userParams
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

    show: (req, res, next) => {
        //let userId= req.params.id;
        let userId= req.params.id;
        console.log("the id:",userId);
        User.findById(userId)
        .then(user => {
            res.locals.user = user;
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
    },

    showView: (req, res) => {
        res.render("users/show");
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
    },


    home: (req, res, next) => {
        User.find()
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {

                console.log(`error fetching user data: ${error.message}`);
                next(error);
            })
    },

    getHome: (req,res) =>{
        res.render("users/home");
    },

};// end of module.exports 