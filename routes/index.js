const router = require("express").Router(),
    userRoutes = require("./userRoutes"),
    homeRoutes = require("./homeRoutes"),
    postRoutes = require("./postRoutes"),
    apiRoutes = require("./apiRoutes"),
    errorRoutes = require("./errorRoutes");

router.use("/", homeRoutes);
router.use("/home", homeRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/api", apiRoutes);
router.use("/", errorRoutes);

module.exports = router;