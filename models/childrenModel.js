const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb+srv://emadnasef86:emadnasef100@cluster0.h4jllrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("connected successfully");
}).catch((err) => {
    console.log("error with that mongo", err);
});

const schema = mongoose.Schema;

const studentSchema = new schema({
    name: { 
        type: String, 
        required: [true, "please enter a user name"],
        lowercase: true,        
    },
    email: { 
        type: String,
        required: [true, "please enter an email"], 
        unique: true,
        lowercase: true,  
        validate: [isEmail, "please enter a valid email"],
    },
    password: { 
        type: String, 
        required: true,
        minlength: [6, "Minimum length is 6 characters"] 
    },
    gradeLevel: { 
        type: String, 
        required: true
    },
    enrolledCourses: [String]
});

studentSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
