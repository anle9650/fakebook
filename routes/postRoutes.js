const router = require("express").Router(),
   postsController = require("../controllers/postsController"),
   usersController = require("../controllers/usersController"),
   hashtagsController = require("../controllers/hashtagsController");

router.post("/create",postsController.create, hashtagsController.add, usersController.redirectView);
router.delete("/:id/delete", postsController.delete, usersController.redirectView);

module.exports = router;