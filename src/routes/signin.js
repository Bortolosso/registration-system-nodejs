const express = require("express");
const router = express.Router();

const controller = require("../controllers/signin");

require("../models/Signup");

router.get("/", controller.LoginValidate);

module.exports = router;