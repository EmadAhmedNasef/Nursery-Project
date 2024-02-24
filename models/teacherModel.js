const mongoose = require("mongoose");
const {isEmail} = require("validator");

mongoose.connect("mongodb+srv://emadnasef86:emadnasef100@cluster0.h4jllrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> {
    console.log("connected successfully");
}).catch( (err) => {
        console.log("error with that mongo" , err);
});


const schema = mongoose.Schema;

const teacherSchema = new schema ({
    name: { 
        type: String, 
        required: [true , "please enter an user name"],
        lowercase : true,        
    },
    email: { 
        type: String,
        required: [true , "please enter an email"], 
        unique: true,
        lowercase : true,  
        //validate : [isEmail , "please enter a valid email"],
    },
    password: { 
        type: Number, 
        required: true ,
        minLength : [6 , "Minimum length is 6 characters"]
    },
    qualifications: String,
    subjects: [String]
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;