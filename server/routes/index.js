const router = require("express").Router();

router.use("/api", require("./posts"));

module.exports = router;
