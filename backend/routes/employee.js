const express = require("express");
const router = express.Router();
const EmployeeController = require("../Controller/employee")
const checkAuth = require ("../check-auth");

router.get("", checkAuth, EmployeeController.getEmployees);

router.get("/:id", checkAuth, EmployeeController.getEmployee);

router.post("", checkAuth, EmployeeController.createEmployee);

router.delete("/:id", checkAuth, EmployeeController.deleteEmployee);

router.put("/:id", checkAuth, EmployeeController.updateEmployee);

module.exports = router;
