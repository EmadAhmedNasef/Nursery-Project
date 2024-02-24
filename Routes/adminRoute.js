const express = require("express");
const adminController = require("./../Controllers/adminController");
const router = express.Router();



router.route("/admin").get(adminController.getAdmin);
router.post("/admin/login" , adminController.login);

router.post("/admin/addTeacher", adminController.addTeacher);
router.post("/admin/addChild", adminController.addChild);


module.exports = router;