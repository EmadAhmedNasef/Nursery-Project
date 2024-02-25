const express = require("express");
const adminController = require("./../Controllers/adminController");
const authController = require("./../Controllers/authController");
const router = express.Router();



router.post("/login" , authController.logIn);
router.get('/admin', adminController.authenticateAdmin ,adminController.getAdmin);
router.post("/admin/addTeacher", adminController.addTeacher);
router.post("/admin/addChild", adminController.addChild);


module.exports = router;