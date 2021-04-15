"use strict";

module.exports = {

    getIndexPage: (req,res) =>{
        res.render("users/login", {
            errorMessage: ""
        });
    },
    getHomePage: (req,res) =>{
        res.render("home", {
            errorMessage: ""
        });
    },


}
