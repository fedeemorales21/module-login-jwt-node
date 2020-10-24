const jwt = require('jsonwebtoken')

const User = require('../models/User')

const register = async (req,res) => {
    try {
        const { name, email, password } = req.body   

        // validations
        if (!name || typeof name !== 'string') {
            res.json({ success: false, message: 'Invalid name' })
        }  
      
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(email.toLowerCase())) {
            res.json({ success: false, message: 'Invalid email' })
        }

        if (password.length < 6) {
            res.json({ success: false, message: 'Invalid password (is too short)' })
        }

        // save into DB
        const newUser = new User({name,email,password})
        newUser.password = await newUser.hashingPassword(password)
        const { name:nameCreated } = await newUser.save()

        res.json({ success: true, message: `User ${nameCreated} was registed` })
    } catch (error) {
        if (error.code == 11000) {
            res.json({ success: false, message: 'Email already register' })
        }            
    }
}


const login = async (req,res) => {
    try {
        const { email, password } = req.body 
        
        const user =  await User.findOne({email}).lean()

        if (!user) {
            res.json({ success: false, message: 'Email not registered yet' })
        }
        
        if (!user.comprarePassword(password)) {
            res.json({ success: false, message: 'Password wrong' })
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: 86400 })

        res.json({ success: true, token })
        
    } catch (error) {
        res.json({ success: false, message: error })
    }
}


const logout = (req,res) => res.json( {success: true , token: null})


const changePassword = async (req,res) => {
    try {
        let { password } = req.body
        
        if (password.length < 6) {
            res.json({ success: false, message: 'Invalid password (is too short)' })
        }
        
        password = await newUser.hashingPassword(password)
        await User.findByIdAndUpdate({ _id:req.userID },{ password },{new: true})
        res.json({ success: true, message: 'Password has been changed' })

    } catch (error) {
        res.json({ success: false, message: error })
    }
}

module.exports = { register,login, logout, changePassword }