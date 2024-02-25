const express = require("express");
const teacherController = require("./../Controllers/teacherController");
const authController = require("./../Controllers/authController");
const router = express.Router();





router.patch("/updateImg" , teacherController.uploadTeacherPhoto , teacherController.getImg);
router.post("/signup" , authController.signUp);
router.post("/login" , authController.logIn);
router.route("/teachers").get(teacherController.getTeachers);
// router.post("/teachers/register" ,teacherController.registerTeacher );
router.route("/teachers/:id").get(teacherController.getSpecifiTeacher)
                             .delete(teacherController.removeTeacher)
                             .patch(teacherController.uploadTeacherPhoto,teacherController.updateTeacher);


router.patch('/teachers/:id/changePassword', teacherController.changeTeacherPassword);

module.exports = router;
