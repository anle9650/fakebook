const router = require("express").Router(),
    userRoutes = require("./userRoutes"),
    homeRoutes = require("./homeRoutes"),
    postRoutes = require("./postRoutes"),
    errorRoutes = require("./errorRoutes");

router.use("/home", homeRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/", errorRoutes);

module.exports = router;