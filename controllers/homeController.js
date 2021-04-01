"use strict";

exports.getHomePage = (req, res) => {
    res.render("login", {
        errorMessage: ""
    });
};