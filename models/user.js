"use strict";

const mongoose = require("mongoose"),
{Schema } = require("mongoose"),
passportLocalMongoose =  require("passport-local-mongoose");
const passport = require("passport");
var userSchema = new mongoose.Schema ({ 
    name:{
        first:{
            type: String,
            required: true,
        },
        last:{
            type: String,
            required: true,
        }
    },
    
    email:{
        type: String,
        required: true,
        unique: true,
    },
    gender:{
        type: String,
        required: true,
    },
    DOB:{
        type: Date,
        required: true,
    },
    city:{
        type: String,
        required: false,
    },
    state:{
        type: String,
        required: true,
    },
    biography:{
        type: String,
        required: false,
        max: 250,//im not sure if max here refers to characters or..?
    },
    ddQuestions:{
        type: String,
        //required: true, some problem here when making a new user
    },
    secAnswer:{
        type: String,
        //required: true,  // some problem here when making a new user
    },

},
{
    timeStamps: true,
});





userSchema.plugin(passportLocalMongoose,{
    usernameField: 'email',
});


module.exports = mongoose.model("User", userSchema);


/*
    userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        email: String,
        gender: String,
        DOB: Date,
        city: String,
        state: String,
        biography: String,
        password: String,
        securityQuestion: String,
        answer: String
    });

*/



/*


<!--<% if (successMessage) { %> 
            <div id="successAlert" class="alert alert-success" role="alert">
                <%= successMessage %>
            </div>
        <% } %> 
        <% if (errorMessage) { %> 
            <div id="errorAlert" class="alert alert-danger" role="alert">
                <%= errorMessage %>
            </div>
        <% } %> -->



*/