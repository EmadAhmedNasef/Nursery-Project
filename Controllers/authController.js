const Teacher = require("./../models/teacherModel");
const Child = require("./../models/childrenModel");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const admin = { userName: 'admin@admin.com', userPass: 'adminPassword' };

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${Date.now()}.${ext}`); 
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');







exports.signUp = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.img = req.file.filename; 
        }
        const newTeacher = await Teacher.create(req.body); 
        const token = jwt.sign({id: newTeacher._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            status: "Success",
            token,
            data: {
                user: newTeacher
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message 
        });
    }
};


exports.logIn = async (req, res) => {
    const { email, password } = req.body;

    
    if (email === admin.userName && password === admin.userPass) {
        const token = jwt.sign({ role: 'Admin' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            status: "Success",
            token,
            message: `Welcome ${admin.userName}, you are logged in as Admin.`,
        });
    }

   
    if (!email || !password) {
        return res.status(400).json({
            status: 'Fail',
            message: "Please provide email and password",
        });
    }

   
    let user = await Teacher.findOne({ email }).exec();
    let role = 'Teacher';

    if (!user) {
        user = await Child.findOne({ email }).exec();
        role = 'Child';
    }

    
    if (!user || !(await user.correctPassword(password))) {
        return res.status(401).json({
            status: 'Fail',
            message: "Incorrect email or password",
        });
    }

   
    const token = jwt.sign({ id: user._id, role: role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.status(200).json({
        status: "Success",
        token,
        message: `Welcome ${user.username}, you are logged in as a ${role}.`,
    });
};