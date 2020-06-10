const express = require("express");
const router = express.Router();
const UserController = require("../Controller/login")

router.post("/login",UserController.userLogin);

module.exports = router;
