const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: String,
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher' // Ensure this matches your teacher model's name
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child' // Ensure this matches your child (student) model's name
    }]
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;
