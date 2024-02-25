const express = require("express");
const teacherController = require("./../Controllers/teacherController");
const authController = require("./../Controllers/authController");
const router = express.Router();

const {body, validationResult} = require('express-validator');



router.patch("/updateImg" , teacherController.uploadTeacherPhoto , teacherController.getImg);
// router.post("/signup" , authController.signUp);
router.post('/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('username').notEmpty().withMessage('Username is required'),
  ], 
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authController.signUp
  );
  



router.post("/login" , authController.logIn);
router.route("/teachers").get(teacherController.getTeachers);
// router.post("/teachers/register" ,teacherController.registerTeacher );
router.route("/teachers/:id").get(teacherController.getSpecifiTeacher)
                             .delete(teacherController.removeTeacher)
                             .patch(teacherController.uploadTeacherPhoto,teacherController.updateTeacher);


router.patch('/teachers/:id/changePassword', teacherController.changeTeacherPassword);

module.exports = router;
