const express = require('express');
const EmployeeModel = require('../models/Employee'); // Import Schema

const router = express.Router();

router.post('/login', (req, res) => {
    console.log('Login route hit');
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            console.log('User found:', user); // Log the user object if found
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No user found with this email");
            }
        })
        .catch(err => {
            console.error("Error during login:", err);
            res.status(500).json("Internal server error");
        });
});

 
//router.post('/signup',(req,res)=>{
//    EmployeeModel.create(req.body) // data which is coming from frontend is indise req.body
//    .then(employees => res.json(employees))
//    .catch(err => res.json(err))
//})
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Ensure all fields are present
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Create a new employee
    EmployeeModel.create({ name, email, password })
        .then(employee => {
            res.status(201).json(employee);  // 201 for successfully created
        })
        .catch(err => {
            console.error("Error creating employee:", err);
            if (err.code === 11000) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;