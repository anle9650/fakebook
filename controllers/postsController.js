const Post = require("../models/post"),
    User = require("../models/user");

let getPostParams = body => {
    return {
        content: body.content
    };
};

module.exports = {
    index: (req, res, next) => {
        Post.find({})
            .then(posts => {
                return Post.populate(posts, "user");
            })
            .then(posts => {
                res.locals.posts = posts;
                next();
            })
            .catch(error => {
                console.log(`Error fetching posts: ${error.message}`)
                next(error);
            });
    },

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
    },

    filterUserPosts: (req, res, next) => {
        let currentUser = res.locals.currentUser;

        if (currentUser) {
            // Filter only posts that either belong to the current user or belong to other users that the current user follows.
            let filteredPosts = res.locals.posts.filter(post => {
                    return (post.user._id.equals(currentUser._id) || (currentUser.follows.includes(post.user._id)));
                });
            res.locals.posts = filteredPosts;
            next();
        } else {
            next();
        }
    }
}
