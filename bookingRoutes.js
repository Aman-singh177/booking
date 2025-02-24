const express = require('express')
const router = express.Router();
const Booking = require('../models/bookings')

router.post("/bookroom", async(req,res) => {
    const{room,
        userid,
        fromdate,
        todate,
        totalAmount,
        totalDays} = req.body

        try{
            const newbooking = new Booking({
                room : room.name,
                roomid : room._id,
                userid,
                fromdate,
                todate,
                totalAmount,
                totalDays,
                transactionId : '1234'
            })
            const booking  = await newbooking.save()
            res.send('Room booked successfully')
        }catch(error){
            res.send("Something went wrong ")
        }
});

module.exports = router
