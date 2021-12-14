import { Router } from 'express';
import Internship from '../../service/internship.service.js';

const internshipRouter = Router();

// get all internships
internshipRouter.get('/', function (req, res) {
    Internship.findAllInternship().then((data) => {
        if (data.data.length) { res.status(200).send() }
        else { res.status(400).send({ message: "no data found"})}
    }).catch(error => {
        res.status(500).send({ message: "Internal Error..."})
    })
})

// post an internship
internshipRouter.post('/', function (req, res, next) {
    Internship.create(req.body)
    .then (function (internship) {
        res.send(internship)
    }).catch(next)
})

// get one internship
internshipRouter.get('/:id', function (req, res, next) {
    Internship.findOne({_id: req.params.id}).then (function (internship) {
        res.send(internship)
    }).catch(next)
})

// update internship
internshipRouter.put('/:id', function (req, res, next) {
    Internship.findByIdAndUpdate({_id: req.params.id}, req.body).
    then (function () {
        Internship.findOne({_id: req.params.id}).then(function (internship){
            res.send(internship)
        })
    }).catch(next)
})

// delete internship
internshipRouter.delete('/:id', function (req, res, next) {
    Internship.findByIdAndRemove({_id: req.params.id}).then (function (internship) {
        res.send(internship)
    }).catch(next)
})

export default internshipRouter;

