const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema =  new Schema({  
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
    role: {
        type: String,
        required: true,
        enum: ['Student', 'Admin', 'Teacher'], 
        default: 'Student' 
    }

}, { discriminatorKey: 'role' });

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.correctPassword = async function(candidatePass, userPass) {
    return await bcrypt.compare(candidatePass, userPass);
}

const User = mongoose.model("User" , userSchema);
module.exports = User ;