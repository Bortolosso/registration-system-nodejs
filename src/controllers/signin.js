const SingUp = require("../models/Signup");

function LoginValidate(req, res){
    SingUp.findOne({email: req.body.email}).then((email) => {

        if(email){
            res.send("LOGADO !");
        }else{
            res.send("Email ou senha invalidos !")
        }
    });
};

module.exports= {
    LoginValidate,
}