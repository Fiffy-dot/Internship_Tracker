const express = require("express")
const router = express.Router()
const Internship = require('../models/internship')

// get all internships
router.get('/internships', function (req, res, next) {
    Internship.find({}).then (function (internships) {
        res.send(internships)
    }).catch(next)
})

// post an internship
router.post('/internships', function (req, res, next) {
    Internship.create(req.body)
    .then (function (internship) {
        res.send(internship)
    }).catch(next)
})

// get one internship
router.get('/internships/:id', function (req, res, next) {
    Internship.findOne({_id: req.params.id}).then (function (internship) {
        res.send(internship)
    }).catch(next)
})

// update internship
router.put('/internships/:id', function (req, res, next) {
    Internship.findByIdAndUpdate({_id: req.params.id}, req.body).
    then (function () {
        Internship.findOne({_id: req.params.id}).then(function (internship){
            res.send(internship)
        })
    }).catch(next)
})

// delete internship
router.delete('/internships/:id', function (req, res, next) {
    Internship.findByIdAndRemove({_id: req.params.id}).then (function (internship) {
        res.send(internship)
    }).catch(next)
})

module.exports = router

