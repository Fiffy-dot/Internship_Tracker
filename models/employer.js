const mongoose = require("mongoose") 
const Schema = mongoose.Schema

// internship schema
const EmployerSchema = new Schema({
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
    password :{
        type: String,
        required : [true, "Title field is required"]
    }
    
})

const Employer = mongoose.model('Employers', EmployerSchema)

module.exports = Employer
