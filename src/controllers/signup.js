const SingUp = require("../models/Signup");

const bcrypt = require("bcrypt");
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
                    date: req.body.date
                };
                new SingUp(newUser).save().then((id) => {
                    console.log("SAVE USER SUCCESS !");
                    
                    var statusCode = res.statusCode;
                    if(statusCode == 200){
                        var newRoomId = id._id;
                        var DateNow = id.date;
        
                        res.send(`ID USER:${newRoomId} \n DATE: ${DateNow}`);
                    }else{};
        
                }).catch((error) => {
                    console.log("ERROR SAVE USER !", error);
                });
                // var hashedPassword = bcrypt.hashSync(req.body.password, 8);

                // var token = jwt.sign({ id: user._id }, config.secret, {
                //     expiresIn: 86400 
                // });
                // res.status(200).send({ auth: true, token: token });
                // res.send({ success: true });
            };
        }
    });
};

function EditUser(req, res){
    var error = [];

    if(error.length > 0){
        console.log("ERROR EDIT USER !");
    }else{
        SingUp.findById({_id: req.params.signUpId}).then((SingUp) => {

            SingUp.nome = req.body.nome;
            SingUp.email = req.body.email;
            SingUp.senha = req.body.senha;
            SingUp.telefone = req.body.telefone;
            SingUp.date = req.body.date;
            SingUp.dateUpdate = req.body.dateUpdate;

            SingUp.save().then((dateUpdate) => {
                var dateUpdate = dateUpdate.dateUpdate;

                // res.send(`DATE: ${dateUpdate}`);

                console.log("EDIT USER SUCCESS !");
                res.send(SingUp);
            }).catch((error) => {
                console.log("ERROR EDIT USER SAVE!", error);
            })
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

        res.send(SingUp);
    });
};

module.exports = {
    CreateUser,
    EditUser
};