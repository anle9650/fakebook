const router = require("express").Router(),
    usersController = require("../controllers/usersController"),
    postsController = require("../controllers/postsController");

// router.post("/login", usersController.apiAuthenticate);

// router.get("/courses", coursesController.index, coursesController.filterUserCourses, coursesController.respondJSON);
// router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
// router.use(coursesController.errorJSON);

module.exports = router;