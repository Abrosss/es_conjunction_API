const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

router.get("/roots/en/:word", apiController.getEnToEsRoot);
router.get("/verbs/:verb", apiController.getVerbs);
router.get("/roots/:verb", apiController.oneRoot);


module.exports = router;
