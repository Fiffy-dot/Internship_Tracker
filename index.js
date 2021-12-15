const express = require("express")
const mongoose = require("mongoose") 
const helmet = require("helmet");

// init app
const app = express()

app.use(helmet());

// connect to mongodb
try {
  mongoose.connect("mongodb+srv://internshiptracker:internshiptracker@cluster0.6cip6.mongodb.net/internshiptracker?retryWrites=true&w=majority")
} catch (error) {
  console.log(error);
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// init the routes
app.use('/', require('./routes/api'))

app.use(function (err, req, res, next) {
  res.status(422).send({error: err.message})
})

app.listen(process.env.port || 8000, () => {
  console.log('server started at http://localhost:8000');
});

