const mongoose = require("mongoose") 
const Schema = mongoose.Schema

// application schema
const ApplicationSchema = new Schema({
    id:{
        type: Number,
        auto: true
    },
    name :{
        type: String,
        required : [true, "Title field is required"]
    },
    email :{
        type: String,
        required : [true, "Title field is required"]
    },
    employerId :{
        type:String,
        required : [true, "Title field is required"]
    },
    jobId :{
        type:String,
        required : [true, "Title field is required"]
    },
    studentId :{
        type:String,
        required : [true, "Title field is required"]
    },
    resumeLink :{
        type: String,
        required : [true, "Title field is required"]
    },
    status :{
        type: String,
        default: "Applied",
    },
})

const Application = mongoose.model('applications', ApplicationSchema)

module.exports = Application
