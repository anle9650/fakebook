"use strict";

const mongoose = require("mongoose"),
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

module.exports = mongoose.model("User", userSchema);