const postsController = require("../controllers/postsController");
const router = require("express").Router(),
    homeController = require("../controllers/homeController");
   
router.get("/", homeController.index, homeController.indexView);

module.exports = router;