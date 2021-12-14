const express = require("express");
const router = express.Router();
const Internship = require("../models/internship");
const Student = require("../models/student");
const Employer = require("../models/employer");
const Application = require("../models/applications");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

// INTERNSHIPS

// get all internships
router.get("/internships", function (req, res, next) {
  Internship.find({})
    .then(function (internships) {
      res.send(internships);
    })
    .catch(next);
});

// post an internship
router.post("/internships", function (req, res, next) {
  Internship.create(req.body)
    .then(function (internship) {
      res.send(internship);
    })
    .catch(next);
});

// get one internship
router.get("/internships/:id", function (req, res, next) {
  Internship.findOne({ _id: req.params.id })
    .then(function (internship) {
      res.send(internship);
    })
    .catch(next);
});

// update internship
router.put("/internships/:id", function (req, res, next) {
  Internship.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      Internship.findOne({ _id: req.params.id }).then(function (internship) {
        res.send(internship);
      });
    })
    .catch(next);
});

// delete internship
router.delete("/internships/:id", function (req, res, next) {
  Internship.findByIdAndRemove({ _id: req.params.id })
    .then(function (internship) {
      res.send(internship);
    })
    .catch(next);
});

// EMPLOYERS

// create an employer
router.post("/employerRegister", async (req, res) => {
  const { name, password: plainTextPassword, email } = req.body;

  if (!name || typeof name !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await Employer.create({
      name,
      password,
      email,
    });
    console.log("Employer created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }

  res.json({ status: "ok" });
});

// Sign In Employer
router.post("/employerLogin", async (req, res, next) => {
  try {
    let employer = await Employer.findOne({ where: { email: req.body.email } });
    if (!employer) {
      return res.status(401).json({
        status: failed,
        message: "Authentication Failed: User with email address not found.",
      });
    }
    bcrypt.compare(req.body.password, employer.password).then((response) => {
      if (!response) {
        return res.status(401).json({
          status: failed,
          message: "Authentication Failed: Incorrect password.",
        });
      }
      let authToken = jwt.sign(
        { email: employer.email, id: employer.id },
        JWT_SECRET
      );
      return res.status(200).json({
        status: true,
        message: "User authentication successful",
        user: { name: employer.name, email: employer.email, id: employer.id },
        token: authToken,
        expiresIn: 3600,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
});

// get all employers
router.get("/employers", function (req, res, next) {
  Employer.find({})
    .then(function (employers) {
      res.send(employers);
    })
    .catch(next);
});

// update employer details
router.put("/employers/:id", function (req, res, next) {
  Employer.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      Employer.findOne({ _id: req.params.id }).then(function (employer) {
        res.send(employer);
      });
    })
    .catch(next);
});

// STUDENTS

// create a student
router.post("/studentRegister", async (req, res) => {
  const { name, password: plainTextPassword, email, resumeLink } = req.body;

  if (resumeLink == '' || typeof resumeLink !== "string") {
    return res.json({ status: "error", error: "No Resume Link Found" });
  }
  if (!name || typeof name !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await Student.create({
      name,
      password,
      email,
      resumeLink
    });
    console.log("Student created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }

  res.json({ status: "ok" });
});

// Sign In Student
router.post("/studentLogin", async (req, res, next) => {
  try {
    let student = await Student.findOne({ where: { email: req.body.email } });
    if (!student) {
      return res.status(401).json({
        status: failed,
        message: "Authentication Failed: User with email address not found.",
      });
    }
    bcrypt.compare(req.body.password, student.password).then((response) => {
      if (!response) {
        return res.status(401).json({
          status: failed,
          message: "Authentication Failed: Incorrect password.",
        });
      }
      let authToken = jwt.sign(
        { email: student.email, id: student.id },
        JWT_SECRET
      );
      return res.status(200).json({
        status: true,
        message: "User authentication successful",
        user: { name: student.name, email: student.email, id: student.id },
        token: authToken,
        expiresIn: 3600,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Oopss! Something is wrong...",
    });
  }
});

// get all students
router.get("/students", function (req, res, next) {
  Student.find({})
    .then(function (students) {
      res.send(students);
    })
    .catch(next);
});

// update student details
router.put("/students/:id", function (req, res, next) {
  Student.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      Student.findOne({ _id: req.params.id }).then(function (student) {
        res.send(student);
      });
    })
    .catch(next);
});

// APPLICATIONS

// create an application
router.post("/createApplication", async (req, res) => {
  const {  name, email, employerId, jobId, studentId, resumeLink } = req.body;

  if (!employerId || typeof employerId !== "string") {
    return res.json({ status: "error", error: "Invalid employerId" });
  }

  if (!jobId || typeof jobId !== "string") {
    return res.json({ status: "error", error: "Invalid jobId" });
  }

  if (!studentId || typeof studentId !== "string") {
    return res.json({ status: "error", error: "Invalid studentId" });
  }

  if (!resumeLink || typeof resumeLink !== "string") {
    return res.json({ status: "error", error: "No Resume Link Found" });
  }
  if (!name || typeof name !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }


  try {
    const response = await Application.create({
      name, email, employerId, jobId, studentId, resumeLink
    });
    console.log("You have applied successfully!", response);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Application already in use" });
    }
    throw error;
  }

  res.json({ status: "ok" });
});

// view all applications
router.get("/applications", function (req, res, next) {
  Application.find({})
    .then(function (applications) {
      res.send(applications);
    })
    .catch(next);
});

// update applicant's status
router.put("/applicantions/:id", function (req, res, next) {
  Application.updateOne({ studentId: req.params.id }, {$set:{status:req.body}})
    .then(function () {
      Application.findOne({ studentId: req.params.id }).then(function (application) {
        res.send(application);
      });
    })
    .catch(next);
});

// get particular employer's applications
router.get("/employerApplicants/:id", function (req, res, next) {
  Application.where({ employerId: req.params.id})
    .then(function (application) {
      res.send(application);
    })
    .catch(next);
});

// get particular student's applications
router.get("/studentApplicants/:id", function (req, res, next) {
  Application.where({ studentId : req.params.id})
    .then(function (application) {
      res.send(application);
    })
    .catch(next);
});


module.exports = router;
