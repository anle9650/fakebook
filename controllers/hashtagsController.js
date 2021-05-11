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
    }
}