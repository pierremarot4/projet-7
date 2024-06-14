const User = require('../models/user model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config;

// Signup
exports.userSignup = async(req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email, 
            password
        });
        await user.save();
        res.status(201).json({ message: 'Nouvel utilisateur enregistré' });
    } catch (error) {
        res.status(403).json({ error });
    }
};

// Login
exports.userLogin = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).json({ error: 'Utilisateur ou mot de passe incorrecte' });
        }

        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            res.status(401).json({ error: 'Utilisateur ou mot de passe incorrecte' });
        }
        
        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                process.env.JWT_TOKEN_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            )
        });
    } catch (error) {
        res.status(500).json({ error });
        console.log(error)
    }
 };

 //Logout
 exports.userLogout = async(req, res, next) => {
    res.status(200).json({})
 }