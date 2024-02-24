const express = require("express");
const teacherController = require("./../Controllers/teacherController");
const router = express.Router();



router.route("/teachers").get(teacherController.getTeachers);
router.post("/teachers/register" ,teacherController.registerTeacher );
router.route("/teachers/:id").get(teacherController.getSpecifiTeacher)
                             .delete(teacherController.removeTeacher)
                             .patch(teacherController.updateTeacher);


router.patch('/teachers/:id/changePassword', teacherController.changeTeacherPassword);


module.exports = router;
