const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    maxcount : {
        type : Number,
        required : true
    },
    phonenumber : {
        type : Number,
        required : true
    },
    rentperday : {
        type : Number,
        required : true
    },
    imageurls : [],
    currentbookings : [],
    type : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
    //time stamps nhi likha 
}) 

                               //collection name, schema
const roomModel = mongoose.model('rooms',roomSchema) // rooms or room
module.exports = roomModel

