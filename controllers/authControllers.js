const User = require('../models/User')
const bcrypt = require('bcrypt')

// Register a User:
const registerUser = async (req , res) => {
    try {
        const { name , email , password } = req.body

        // 1. Check that all fields are provided
        if(!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide Name, Email, and Password"
            })
    } 

        // 2. Check that name and email aren't just whitespace
        if(!name.trim() || !email.trim()) {
            return res.status(400).json({
                message: "Name, and Email cannot be empty"
        })
    }

        // 3. Check the minimum password length
        if(password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
        })
    }
    
        // 4. Check whether this email is already registered
        const existingUser = await User.findOne({
            email: email.trim().toLowerCase()
        })
        if(existingUser) {
            return res.status(409).json({
                message: "Email is already registered"
        })
    }

        // 5. Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password , 10)

        // 6. Save the new user in MongoDB
        const user = await User.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword
        })

        // 7. Send a successful response without the password
        res.status(201).json({
            message: "User registered successfully" ,
            data: {
                id: user._id ,
                name: user.name ,
                email: user.email
            }
        })

    } catch (error) {

        // Handle duplicate-email index errors too
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Email is already registered'
            })
        }

        res.status(500).json({
            message: 'Failed to register user' ,
            error: error.message
            
        })
    }
}


const loginUser = async (req , res) => {
    try {
        const { email , password } = req.body

        // 1. Check required fields
        if(!email || !password) {
            return res.status(400).json({
                message: 'Please provide email & password'
            })
        }

         // 2. Find the user by email
         const user = await User.findOne({
            email: email.trim().toLowerCase()
         })

         if(!user) {
            return res.status(401).json({
                message: 'Invalid Email or password'
            })
         }

         // 3. Compare the submitted password with the stored hash
         const isPasswordCorrect = await bcrypt.compare(password , user.password)
         if(!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Incorrect Password'
            })
         }

         // 4. Create a JWT
         const token = require('jsonwebtoken').sign(
            { userId : user._id } ,
            process.env.JWT_SECRET ,
            { expiresIn : '5h' }
        )

        // 5. Send the token to the client
        res.status(200).json({
            message: 'Login Successful' ,
            token
        })
    } catch (error) {
        console.error('Login Error' , error.message)

        res.status(500).json({
            message: 'Failed to login'
        })
    }
}

module.exports = { registerUser , loginUser}
    