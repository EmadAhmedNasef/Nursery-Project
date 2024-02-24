const express = require("express");
const adminController = require("./../Controllers/adminController");
// const { route } = require("./adminRoute");
const router = express.Router();



router.route("/admin").get(adminController.getAdmin);
router.post("/admin/login" , adminController.login);


module.exports = router;