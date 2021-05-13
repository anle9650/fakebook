const router = require("express").Router(),
    usersController = require("../controllers/usersController"),
    postsController = require("../controllers/postsController"),
    hashtagsController = require("../controllers/hashtagsController"),
    errorController = require("../controllers/errorController");

//router.post("/login", usersController.apiAuthenticate);
//router.use(usersController.verifyJWT);

router.get("/users", usersController.index, usersController.filterUserFollows, usersController.respondJSON);
router.get("/users/:id/follow", usersController.follow, usersController.respondJSON);
router.get("/users/:id/unfollow", usersController.unfollow, usersController.respondJSON);

router.get("/posts", postsController.index, postsController.filterUserPosts, postsController.respondJSON);
router.get("/notifications", postsController.index, postsController.filterUserNotifications, postsController.respondJSON);

router.get("/hashtags", hashtagsController.index, hashtagsController.filterTopHashtags, hashtagsController.respondJSON);

router.use(errorController.errorJSON);

module.exports = router;