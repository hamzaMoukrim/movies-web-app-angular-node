const express = require("express");
const router = express.Router();

router.use("/users", require("./users/index"));
router.use("/movies", require("./films/index"));
router.use("/comments", require("./commentaires/index"));

module.exports = router;
