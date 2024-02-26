const classModel = require('../models/classModel')
exports.getAllClasses = async (req,res,next)=>{
    try {
        const allClasses = await classModel.find()
        res.status(200).json({allClasses})
    } catch (err) {
        next(err)
    }}
exports.getClassById = (req,res,next)=>{
    try {
        const id = req.params.id;
        classModel.findOne({_id:id}).then((data) => {
            res.status(200).json({ data });
        }).catch((error) => {
            next(error)
        });
    }
    catch (error) {
        next(error)
    }
}
exports.addNewClass = async(req,res,next)=>{
    try{
        const {name,supervisor,children} = req.body
        const user = await classModel.create({name,supervisor,children})
        res.status(201).json({user})
    }catch(err){
        next(err)
    }}


exports.updateClass = async (req,res,next)=>{
    try {
        const id = req.body._id
        const data = req.body       
        const newData = await classModel.findByIdAndUpdate(id,data,{new:true})
        res.status(200).json({newData})
    } catch (err) {
        next(err)
    }}

exports.deleteClass = async (req,res,next)=>{
    try {
        const id = req.params.id;
        classModel.findByIdAndDelete(id).then((data) => {
            res.status(200).json({ data });
        }).catch((err) => {
            next(err)
        });
    }
    catch (err) {
        next(err)
    }
}


exports.getAllClassChildernById = async (req,res,next)=>{
    try {
        const classId = req.params.id
        const result = await classModel.findById(classId).populate('children');
        res.status(200).json(result.children)
    } catch (error) {
        next(error)
    }
}

exports.getAllClassSupervisors = async (req,res,next)=>{
    try {
        const classId = req.params.id
        const result = await classModel.findById(classId).populate('supervisor');
        console.log(result);
        res.status(200).json(result.supervisor)
    } catch (error) {
        next(error)
    }}