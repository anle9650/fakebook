"use strict";


const Post = require("../models/post");

let getPostParams = body => {
    return {
        content: body.content,
    };
};



module.exports = {


    create: (req, res, next) => {
        if(req.skip) return next();
        let newPost = getPostParams(req.body);
        console.log("asdasdasdasdasdasdasasdasdas");
        Post.create(newPost)
        .then(post => {
            res.locals.post = post;
            res.locals.redirect = "/home"
            next();
        })
        .catch(error => {

            console.log(`there was an error making a post: ${error.message}`);
            next(error);
        })
        
    },
    home: (req, res, next) => {
        Post.find()
            .then(posts => {
                res.locals.posts = posts;
                next();
            })
            .catch(error => {

                console.log(`error fetching post data: ${error.message}`);
                next(error);
            });
    },
    homeView: (req, res) => {
        res.render("../views/home",{posts: res.locals.posts});
    },


}
