var express = require("express");
router = express.Router();
var controller = require("./controller.js");
router.post("/", controller.post.reverseGeocode);
//router.put("/", controller.put.industries);
//router.delete("/:id", controller.delete.industry);

module.exports = router;
