const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");


mongoose.connect("mongodb+srv://emadnasef86:emadnasef100@cluster0.h4jllrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("connected successfully");
}).catch((err) => {
    console.log("error with that mongo", err);
});


const studentSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true , "please provide your name"] 
    
    },
    email : {
        type:String,
        required: [true , "please provide your email"],
        unique: true,
        lowerCase : true,
        validator : [validator.isEmail,"Please provide a valid email"]
    },
    img : {type : String},
    password: { 
        type: String, 
        required: [true , "please provide a password"] ,
        minlength : 8
    },
    gradeLevel: {
        type: String,
        required: [true, "Grade level is required"]
    },
    enrolledCourses: {
        type: [String],
    }
});

studentSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

studentSchema.methods.correctPassword = async function(candidatePass, userPass) {
    return await bcrypt.compare(candidatePass, userPass);
}

const Student = mongoose.model('Child', studentSchema);
module.exports = Student;
