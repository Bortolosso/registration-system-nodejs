const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SignUpSchema = new Schema({
    nome:{
        type: String
    },
    email:{
        type: String
    },
    senha:{
        type: String
    },
    telefone:[{
        numero:{
            type: Number
        },
        ddd:{
            type: Number
        }
    }],

    date: {
        type: Date,
        default: Date
    },
});

const SignUp = mongoose.model("SignUp", SignUpSchema);

module.exports = SignUp; 

