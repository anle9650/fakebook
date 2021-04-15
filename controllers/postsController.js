"use strict";


const post = require("../models/post");

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
        post.create(newPost)
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


}
