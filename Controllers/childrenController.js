const Children = require("./../models/childrenModel");


const multer = require('multer');


const multerStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null, 'images') ;
    },
    filename : (req , file , cb)=> {
        const ext = file.mimetype.split("/")[1];
        cb(null , `user-${Date.now()}.${ext}`);
    }
});

const multerFiter = (req , file , cb )=>{
    if(file.mimetype.startsWith('image')) {
        cb(null , true );  
    }else {
        cb(new Error("Invalid Image Type"),false); 
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter : multerFiter
});

exports.uploadTeacherPhoto = upload.single("photo");



exports.getChildren = async (req, res) => {
    try {
        const children = await Children.find();
        res.status(200).json(children);
    } catch (err) {
        res.status(400).send("Error fetching children");
    }
};

// exports.registerChild = async (req, res) => {
//     const { name, email, password, gradeLevel,enrolledCourses } = req.body; 
//     try {
//         const newChild = await Children.create({ name, email, password, gradeLevel ,enrolledCourses });
//         res.status(201).json(newChild);
//     } catch (err) {
//         handleErrors(err);
//         res.status(400).send("Error, child not created");
//     }
// };

exports.getSpecificChild = async (req, res) => {
    const id = req.params.id;
    try {
        const child = await Children.findById(id);
        if (child) {
            res.json(child);
        } else {
            res.status(404).send('Child not found');
        }
    } catch (error) {
        res.status(400).send('Invalid ID format');
    }
};

exports.removeChild = async (req, res) => {
    const id = req.params.id;
    try {
        const child = await Children.findByIdAndDelete(id);
        if (child) {
            res.json(child);
        } else {
            res.status(404).send('Child not found');
        }
    } catch (error) {
        res.status(400).send('Invalid ID format');
    }
};

exports.updateChild = async (req, res) => {
    const id = req.params.id;
    let updateData = req.body;

    if (req.file) {
        updateData.img = req.file.filename;
    }

    try {
        const child = await Children.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (child) {
            res.json(child);
        } else {
            res.status(404).send('Child not found');
        }
    } catch (error) {
        res.status(400).send('Invalid ID format');
    }
};



exports.getImg = async (req ,res) => {
    console.log(req.file);
    console.log(req.body);
}

