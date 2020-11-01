const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const e = require("express");
const Employee = mongoose.model("Employee");

router.get("/", (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Insert Employee",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

router.get("/list", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.render("employee/list", {
        list: docs,
      });
    } else {
      console.log("Error in retriving employee list : " + err);
    }
  });
});

router.get("/:id", (req, res) => {
  Employee.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.render("employee/addOrEdit", {
        viewTitle: "Edit Employee",
        employee: docs,
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Employee.findOneAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.redirect("/employee/list");
    } else {
      console.log("There is an error while deleting record");
    }
  });
});

function insertRecord(req, res) {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc) => {
    if (!err) res.redirect("employee/list");
    else {
      console.log("error during record insertion: " + err);
    }
  });
}

function updateRecord(req, res) {
  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("employee/list");
      } else {
        req.render("employee/addOrEdit", {
          viewTitle: "Update Employee",
          employee: res.body,
        });
      }
    }
  );
}

module.exports = router;
