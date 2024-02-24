const Teacher = require("./../models/teacherModel");

exports.getTeachers =  async(req , res) => {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
};

exports.registerTeacher =  async (req , res) => {
    const newTeacher = new Teacher();

    const {name , email , password , qualifications , subjects} = req.body;
    try {
        const newTeacher = await Teacher.create({name , email , password , qualifications ,subjects});
        res.status(201).json(newTeacher);
    }
    catch(err){
        console.log(err);
        res.status(400).send("error , user not created");
    }

    // const teacherName = req.body.name;
    // const teacherEmail = req.body.email;
    // const teacherPassword = req.body.password;
    // const teacherQualifications = req.body.qualifications;
    // const teacherSubjects = req.body.subjects;

    // newTeacher.name = teacherName;
    // newTeacher.email = teacherEmail;
    // newTeacher.password = teacherPassword;
    // newTeacher.qualifications = teacherQualifications;
    // newTeacher.subjects = teacherSubjects ;
    
    // await newTeacher.save();

    // res.send("the new teacher has been added successfully")
};

exports.getSpecifiTeacher = async (req , res) => {
    const id = req.params.id; 
    try {
        const teacher = await Teacher.findById(id); 

        if (teacher) {
            res.json(teacher);
        } else {
            res.status(404).send('Teacher not found');
        }
    } catch (error) {
        res.status(400).send('Invalid ID format');
    }
};

exports.removeTeacher = async (req , res) => {
    const id = req.params.id; 
    try {
        const teacher = await Teacher.findByIdAndDelete(id); 

        if (teacher) {
            res.json(teacher);
        } else {
            res.status(404).send('Teacher not found');
        }
    } catch (error) {
        res.status(400).send('Invalid ID format');
    }
};

exports.updateTeacher = async (req , res) => {
    const id = req.params.id; 
    try {
        const teacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (teacher) {
            res.json(req.body);
        } else {
            res.status(404).send('Teacher not found');
        }
    } catch (error) {
        res.status(400).send('Invalid ID format');
    }
};