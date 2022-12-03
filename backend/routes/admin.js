const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/verbs/:verb", adminController.getVerbs);
router.get("/roots/:verb", adminController.oneRoot);


module.exports = router;
