const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const EmployeeModel= require('./models/Employee')

// Import Routes
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoute = require('./routes/bookingRoutes');

const app = express();

// Middlewares // to recieve booking paramter
app.use(express.json()) // this will transfoer the data which we are passsing through 
// from frontend to backend through json format
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Use Routes
app.use('/api/auth',authRoutes);   
app.use('/api/rooms',roomRoutes);
app.use('/api/bookings', bookingRoute);

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/employee");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Database connection error:", err.message);
        process.exit(1);  // Exit process if connection fails
    }
};
connectDB()

app.listen(3001, () => {
    console.log("Server started......")
})
