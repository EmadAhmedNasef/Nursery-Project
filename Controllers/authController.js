const User = require("./../models/userModel");
const multer = require("multer");
const jwt = require("jsonwebtoken");



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
        let profilePicture;
        if (req.file) {
            profilePicture.img = req.file.filename;
        }
        const newUser = await User.create(req.body); 

        const token = jwt.sign({id: newUser._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // Optionally, you can set an expiration for the token

        res.status(201).json({
            status: "Success",
            token,
            data: {
                user: newUser
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message 
        });
    }
};


exports.logIn = async (req , res , next) => {
    const {email , password} = req.body;
    if(!email || !password) {
        res.status(400).json({
            status  : 'Fail',
            message : "please proveide email and pass",
        })
    }

    const user = await User.findOne({email }) 
    
    if(!user || !(await user.correctPassword(password , user.password))) {
        res.status(401).json({
            status  : 'Fail',
            message : "user not found or pass not correct",
        })
    }



    const token = jwt.sign({id : user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({
        status : "Success" ,
        token,
        message: `Welcome ${user.username}, you are logged in as a ${user.role}.`,
    });

}

