"use strict";

const Post = require("../models/post"),
    User = require("../models/user");

module.exports = {
    index: (req, res, next) =>{
        User.find({})
            .then(users => {
                res.locals.users = users;
            })
            .then(() => {
                return Post.find({});
            })
            .then(posts => {
                return Post.populate(posts, "user");
            })
            .then(posts => {
                res.locals.posts = posts;
                next();
            })
            .catch(error => {
                console.log(`error fetching data: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("home/index");
    }
}
