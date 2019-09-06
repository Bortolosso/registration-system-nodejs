const express = require ("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const CONST = require("./src/constants/const")
const SignUp = require("./src/routes/signgup");
const SignIn = require("./src/routes/signin");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

mongoose.Promise =  global.Promise;
mongoose.connect(CONST.APP.MONGODB.LOCALHOST.URL, {
    useNewUrlParser: true
}).then(() => {
    console.log(CONST.APP.MESSAGE.SUCCESS.NOTICE);
}).catch((error) => {
    console.log(CONST.APP.MESSAGE.ERROR, error);
});

app.use(express.static(path.join(__dirname, "public")));

app.use(router);
router.use("/signup", SignUp);
router.use("/singin", SignIn);

var PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server its running in http://localhost:${PORT}`);
});
