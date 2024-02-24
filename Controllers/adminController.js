const Teacher = require("./../models/teacherModel"); 
const Student = require("./../models/childrenModel"); 

exports.getAdmin = (req , res) => {
    res.status(200).json({
        message : "Welcome to admin page!",
    });
};

const admin = {
    userName : "admin",
    userPass : 123456789
}

exports.login = (req, res) =>{
    const { username, password } = req.body;
    if (username === admin.userName && password === admin.userPass) {
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
}


exports.addTeacher = async (req, res) => {
    try {
        const newTeacher = await Teacher.create(req.body);
        res.status(201).json({
            status: 'success',
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
        const newStudent = await Student.create(req.body);
        res.status(201).json({
            status: 'success',
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
