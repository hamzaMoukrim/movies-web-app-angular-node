const express = require("express");
const router = express.Router();

router.use("/getFav", require("./get"));
router.use("/addFav", require("./addFav"));
router.use("/removeFav", require("./removeFav"));

module.exports = router;
