const Children = require("./../models/childrenModel");


exports.getChildren = async (req, res) => {
    try {
        const children = await Children.find();
        res.status(200).json(children);
    } catch (err) {
        res.status(400).send("Error fetching children");
    }
};

exports.registerChild = async (req, res) => {
    const { name, email, password, gradeLevel,enrolledCourses } = req.body; 
    try {
        const newChild = await Children.create({ name, email, password, gradeLevel ,enrolledCourses });
        res.status(201).json(newChild);
    } catch (err) {
        handleErrors(err);
        res.status(400).send("Error, child not created");
    }
};

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
    const updateData = req.body; 
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
