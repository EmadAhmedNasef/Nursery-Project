const Teacher = require("./../models/teacherModel");
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
    console.log(err.message , err.code);
}

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
        handleErrors(err);
        res.status(400).send("error , user not created");
    }
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



exports.changeTeacherPassword = async (req, res) => {
    const { id } = req.params; 
    const { newPassword } = req.body; 

    if (!newPassword) {
        return res.status(400).send('New password is required');
    }

    try {
        const teacher = await Teacher.findById(id);

        if (!teacher) {
            return res.status(404).send('Teacher not found');
        }

        const isSamePassword = await bcrypt.compare(newPassword, teacher.password);
        if (isSamePassword) {
            return res.status(400).send('New password must be different from the current password');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await Teacher.findByIdAndUpdate(id, { password: hashedPassword });

        res.status(200).send('Password updated successfully');
    } catch (error) {
        res.status(500).send('teacher not found');
    }
};
