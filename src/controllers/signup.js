const SingUp = require("../models/Signup");

const jwt = require("jsonwebtoken");

function CreateUser(req, res){
    var error = [];

    SingUp.findOne({email: req.body.email}).then((users) => {
        if(users){
            res.send("EXIST EMAIL !");
        }else{
            if(error.length > 0){
                console.log("ERROR CREATE USER !");
                res.send({ success: false });
            }else{
                const newUser = {
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                    telefone: req.body.telefone,
                    date: req.body.date,                    
                };
                new SingUp(newUser).save().then((id) => {
                    console.log("SAVE USER SUCCESS !");
                    
                    var statusCode = res.statusCode;
                    if(statusCode == 200){
                        jwt.sign({newUser}, "secretkey", (error, token) => {
                            res.json({
                                token
                            });
                        });

                        jwt.verify(req.token, "secretkey", (error, authData) =>{
                            if(error){
                                res.sendStatus(403);
                            }else{
                                var NewRoomId = id._id;
                                var DateNow = id.date;
                        
                                res.send(`ID OF USER:${NewRoomId} \n DATE OF CREATE: ${DateNow}`);
                                authData;
                            };
                        });
                    }else{
                        res.send(`ERROR STATUS CODE !`, statusCode);
                    };
                }).catch((error) => {
                    console.log("ERROR SAVE USER !", error);
                });
            };
        };
    });
};

//Middleware_Verify_Token
function verifyToken(req, res){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split("");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    };
};

function EditUser(req, res){
    var error = [];

    if(error.length > 0){
        console.log("ERROR EDIT USER !");
    }else{
        SingUp.findOne({_id: req.params.signUpId}).then((SingUp) => {
            SingUp.save().then(() => {
                console.log("EDIT USER SUCCESS !");
                ShowAll(req, res);
                // res.send(SingUp);
            }).catch((error) => {
                console.log("ERROR EDIT USER SAVE!", error);
            });
        }).catch((error) => {
            console.log("ERROR EDIT USER !", error);
        });
    };
};

function ShowAll(req, res){
    SingUp.find({}).then((SingUp) => {
        SingUp.nome = req.body.nome;
        SingUp.email = req.body.email;
        SingUp.senha = req.body.senha;
        SingUp.telefone = req.body.telefone;
        SingUp.date = req.body.date;
    }).catch((error) => {
        console.log("ERROR !!!", error);
    });

function ShowId(req, res){
    SingUp.findOne({_id: req.params.signUpId}).then((id) => {
        var NewRoomId = id._id;
        var DateNow = id.date;
        res.send(`ID OF USER:${NewRoomId} \n DATE OF CREATE: ${DateNow}`);
        });
    };
};

module.exports = {
    CreateUser,
    EditUser,
    verifyToken
};