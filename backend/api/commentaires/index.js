const express = require("express");
const router = express.Router();

router.use("/addComment", require("./addComment"));
router.use("/get", require("./getComments"));

module.exports = router;
