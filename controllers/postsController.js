"use strict";


const Post = require("../models/post"),
    User = require("../models/user");

let getPostParams = body => {
    return {
        content: body.content
    };
};

module.exports = {
    create: (req, res, next) => {
        var newPost = getPostParams(req.body),
            currentUser = req.user;
        
        Post.create(newPost)
            .then(post => {
                newPost = post;
            })
            .then(() => {
                newPost.user = currentUser;
                newPost.save();
            })
            .then(() => {
                res.locals.redirect = "/home"
                next();
            })
            .catch(error => {
                console.log(`there was an error making a post: ${error.message}`);
                next(error);
            });
    },

    delete: (req, res, next) => {
        let postId = req.params.id;
        Post.findByIdAndRemove(postId)
            .then(() => {
                res.locals.redirect = "/home";
                next();
            })
            .catch(error => {
                console.log(`error fetching post by id: ${error.message}`);
            });
    }
}
