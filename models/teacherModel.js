const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");


mongoose.connect("mongodb+srv://emadnasef86:emadnasef100@cluster0.h4jllrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> {
    console.log("connected successfully");
}).catch( (err) => {
        console.log("error with that mongo" , err);
});

const teacherSchema = new mongoose.Schema({
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
    qualifications: {
        type: String,
        required: true
    },
    subjects: {
        type: [String],
        required: true
    }
});

teacherSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

teacherSchema.methods.correctPassword = async function(candidatePass, userPass) {
    return await bcrypt.compare(candidatePass, userPass);
}

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;