const mongoose = require("mongoose");
const User = require("./../models/userModel"); 


mongoose.connect("mongodb+srv://emadnasef86:emadnasef100@cluster0.h4jllrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> {
    console.log("connected successfully");
}).catch( (err) => {
        console.log("error with that mongo" , err);
});

const teacherSchema = new mongoose.Schema({
    qualifications: {
        type: String,
        required: true
    },
    subjects: {
        type: [String],
        required: true
    }
});

const Teacher = User.discriminator('Teacher', teacherSchema);

module.exports = Teacher;