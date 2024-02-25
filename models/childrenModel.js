const mongoose = require("mongoose");
const User = require("./../models/userModel"); 

mongoose.connect("mongodb+srv://emadnasef86:emadnasef100@cluster0.h4jllrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("connected successfully");
}).catch((err) => {
    console.log("error with that mongo", err);
});


const studentSchema = new mongoose.Schema({
    gradeLevel: {
        type: String,
        required: [true, "Grade level is required"]
    },
    enrolledCourses: {
        type: [String],
    }
});

const Student = User.discriminator('Child', studentSchema);
module.exports = Student;
