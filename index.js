const express = require("express")
const mongoose = require("mongoose") 
const bodyParser = require ("body-parser")

// init app
const app = express()

// connect to mongodb
mongoose.connect("mongodb://localhost/internship-tracker")
mongoose.Promise = global.Promise

app.use(bodyParser.json())

// init the routes
app.use('/api', require('./routes/api'))

app.use(function (err, req, res, next) {
  res.status(422).send({error: err.message})
})

app.listen(process.env.port || 8000, () => {
  console.log('server started at http://localhost:8000');
});