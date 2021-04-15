"use strict";

exports.getHomePage = (req, res) => {
    res.render("users/login", {
        errorMessage: ""
    });
};