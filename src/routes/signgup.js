const express = require("express");
const router = express.Router();

const controller = require("../controllers/signup");

require("../models/Signup");

router.post("/", controller.CreateUser);

router.put("/:signUpId", controller.EditUser);

module.exports = router;