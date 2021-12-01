const mongoose = require("mongoose") 
const Schema = mongoose.Schema

// internship schema
const InternshipSchema = new Schema({
    id:{
        type: Number,
        auto: true
    },
    title :{
        type: String,
        required : [true, "Title field is required"]
    },
    employerId :{
        type:Number,
        required : [true, "Title field is required"]
    },
    numberCandidate :{
        type: Number,
        required : [true, "Title field is required"]
    },
    description :{
        type: String,
        required : [true, "Title field is required"]
    },
    position :{
        type: String,
        required : [true, "Title field is required"]
    },
    dueDate :{
        type: Date,
        required : [true, "Title field is required"]
    },
    createdDate : {
        type: Date,
        required : [true, "Title field is required"]
    }
})

const Internship = mongoose.model('internships', InternshipSchema)

module.exports = Internship
