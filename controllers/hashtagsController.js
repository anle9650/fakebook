const Hashtag = require("../models/hashtag");

module.exports = {
    index: (req, res, next) => {
        Hashtag.find({})
            .then(hashtags => {
                res.locals.hashtags = hashtags;
                next();
            })
            .catch(error => {
                console.log(`Error fetching hashtags: ${error.message}`)
                next(error);
            });
    },

    add: (req, res, next) => {
        var regexp = /\B\#\w\w+\b/g;
        let post = res.locals.post,
            // Find all hastag names in the post.
            hashtagNames = post.content.match(regexp);
        
        if (hashtagNames) {
            // Determine if each hashtag already exists in the database.
            hashtagNames.forEach(hashtagName => {
                // If the hashtag already exists, update the hashtag by adding the new post to its list of posts. Otherwise, upsert the new hashtag into the database.
                Hashtag.findOneAndUpdate({ name: hashtagName }, { $addToSet: { posts: post._id } }, { upsert: true })
                    .then(() => {
                        res.locals.redirect = "/home"
                        next();
                    })
                    .catch(error => {
                        console.log(`there was an error adding a hashtag: ${error.message}`);
                        next(error);
                    });
            });
        } else {
            res.locals.redirect = "/home"
            next();
        }
    },

    filterTopHashtags: (req, res, next) => {
        // Get the top 10 most popular hashtags.
        let hashtags = res.locals.hashtags,
            topHashtags = hashtags.sort((a, b) => b.posts.length - a.posts.length).slice(0, 10);
        
        res.locals.hashtags = topHashtags;
        next();
    },

    removePost: (req, res, next) => {
        let postId = req.params.id;

        // Supposed to remove all Hashtag references to a post after deleting a post, but currently doesn't work.
        Hashtag.find({ posts: { $in: [postId] } }).then(hashtags => {
            hashtags.forEach(hashtag => {
                Hashtag.findByIdAndUpdate(
                    hashtag._id,
                    { $pull: { posts: postId } },
                    { new: true }
                )
            })
        }).then(() => {
            res.locals.redirect = "/home";
            next();
        });
    }
}