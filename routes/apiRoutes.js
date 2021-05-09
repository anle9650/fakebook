const router = require("express").Router(),
    usersController = require("../controllers/usersController"),
    postsController = require("../controllers/postsController");

// router.post("/login", usersController.apiAuthenticate);
// router.use(usersController.verifyJWT);

router.get("/users", usersController.index, usersController.filterUserFollows, usersController.respondJSON);
router.get("/users/:id/follow", usersController.follow, usersController.respondJSON);
router.get("/users/:id/unfollow", usersController.unfollow, usersController.respondJSON);

router.get("/posts", postsController.index, postsController.filterUserPosts, usersController.respondJSON);
// router.get("/posts/:id/delete", postsController.delete, usersController.respondJSON);

router.use(usersController.errorJSON);

module.exports = router;