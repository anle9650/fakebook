const router = require("express").Router(),
   postsController = require("../controllers/postsController"),
   usersController = require("../controllers/usersController");

router.post("/create",postsController.create, usersController.redirectView);
router.delete("/:id/delete", postsController.delete, usersController.redirectView);

module.exports = router;