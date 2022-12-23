const express = require('express');
const router = express.Router();

// Login page
router.get('/login', (req, res) => res.render('login'));

// Register page
router.get('/register', (req, res) => res.render('register'));

// Register Handler
router.post('/register', (req, res) => {
    try {
        const { name, email, password, password2 } = req.body;
        let errors = [];

        // Validate fields
        if (!name ||!email ||!password ||!password2) {
            errors.push('Please fill in all the required fields');
            }
        
        // Check password match
        if (password!== password2) {
        errors.push('Passwords do not match');
        }

        // check password length
        if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
        }

        if (errors.length > 0) {
            res.render('register', {
                errors, 
                name, 
                email, 
                password, 
                password2
            });
        } else {
            // const { message } = await register(email, password);
            return res.send( "User registered" );
        }  
    } catch (error) {
        return res.send('Encountered Error while registering: ' + error);  
    }    
}); 

module.exports = router;