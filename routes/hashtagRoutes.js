const router = require("express").Router(),
    hashtagsController = require("../controllers/hashtagsController");

router.get("/:id", hashtagsController.show, hashtagsController.showView);

module.exports = router;