const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    room : {
        type : String, required : true
    },
    roomid : {
        type : String, required : true
    },
    userid : {
        type : String, required : true
    },
    fromdate : {
        type : String, required : true
    },
    todate : {
        type : String, required : true
    },
    totalamount : {
        type : Number, required : true
    },
    totaldays : {
        type : Number, required : true
    },
    transactionId : {
        type : String, required : true
    },
    status : {
        type : String, required : true, default : 'booked'
    }
})

const bookingmodel = mongoose.model("bookings",bookingSchema);
module.exports = bookingmodel
