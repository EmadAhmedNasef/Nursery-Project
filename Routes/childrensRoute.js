const express = require("express");
const childrenController = require("./../Controllers/childrenController");
const router = express.Router();



router.route("/childrens").get(childrenController.getChildrens);


module.exports = router;