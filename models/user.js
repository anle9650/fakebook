"use strict";

const mongoose = require("mongoose"),
    {Schema} = mongoose,
    passport = require("passport"),
    passportLocalMongoose = require("passport-local-mongoose"),
    userSchema = new Schema({
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

    userName: {
        type: String,
        required: true
    },
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        required: true
    },
    DOB:{
        type: Date,
        required: true
    },
    city:{
        type: String,
        required: false
    },
    state:{
        type: String,
        required: true
    },
    biography:{
        type: String,
        required: false,
        max: 250//im not sure if max here refers to characters or..?
    },
    securityQuestion:{
        type: String,
        required: true //some problem here when making a new user
    },
    securityAnswer:{
        type: String,
        required: true  // some problem here when making a new user
    },

    posts: [{type: Schema.Types.ObjectId, ref: Post}],


},
{
    timeStamps: true,
});

userSchema.virtual("fullName")
    .get(function() {
        return `${this.name.first} ${this.name.last}`;
    });

userSchema.plugin(passportLocalMongoose,{
    usernameField: 'email',
});

module.exports = mongoose.model("User", userSchema);