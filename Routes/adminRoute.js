const express = require("express");
const adminController = require("./../Controllers/adminController");
const authController = require("./../Controllers/authController");
const router = express.Router();

const {body, validationResult} = require('express-validator');

router.post("/login" , authController.logIn);
router.get('/admin', adminController.authenticateAdmin ,adminController.getAdmin);

// router.post("/admin/addTeacher", adminController.addTeacher);
router.post('/admin/addTeacher',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  adminController.addTeacher
);

// router.post("/admin/addChild", adminController.addChild);
router.post('/admin/addChild', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ], 
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  adminController.addChild
);
  

module.exports = router;