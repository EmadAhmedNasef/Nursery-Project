const Teacher = require("./../models/teacherModel"); 
const Student = require("./../models/childrenModel"); 
const jwt = require("jsonwebtoken");

exports.getAdmin = (req , res) => {
    res.status(200).json({
        message : "Welcome to admin page!",
    });
};


// const admin = {
//     userName : "admin",
//     userPass : 123456789
// }


exports.addTeacher = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await Teacher.findOne({ email }) || await Student.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email is already in use'
            });
        }
        
        if (req.file) {
            req.body.img = req.file.path;
        }

        const newTeacher = await Teacher.create(req.body);
        const token = jwt.sign({ id: newTeacher._id }, process.env.ACCESS_TOKEN_SECRET);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                teacher: newTeacher
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
};

exports.addChild = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await Teacher.findOne({ email }) || await Student.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email is already in use'
            });
        }

        if (req.file) {
            req.body.img = req.file.path;
        }

        const newStudent = await Student.create(req.body);
        const token = jwt.sign({ id: newStudent._id }, process.env.ACCESS_TOKEN_SECRET);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                student: newStudent
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
};


exports.authenticateAdmin = (req, res, next) => {
    const { name, pass } = req.body;

    if (name === admin.userName && pass === admin.userPass) {
        next(); 
    } else {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized: Incorrect admin credentials'
        });
    }
};