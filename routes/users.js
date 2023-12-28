const errors = require("restify-errors");
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const auth = require('../auth');
const jwt = require('jsonwebtoken')
const config = require('../config');
const rjwt = require('restify-jwt-community');

module.exports = server => {

    server.post('/register', rjwt({secret :config.JWT_SECRET}),  (req, res, next) => {
        const {email, password} = req.body;
        const user = new User({
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                user.password = hash
                try {
                    const newUser  = await user.save();
                    res.send(200, {'mensaje':'Registrado'});
                    next();
                } catch (error) {
                    
                }
            })
        })

    });

    server.post('/auth', async (req, res) => {
        const {email, password} = req.body;
        
        try {
            const user = await auth.authenticate(email, password)
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                expiresIn: '15m'
            })
            const {iat, exp} = jwt.decode(token);
            res.send({iat, exp, token})
        } catch (error) {
            
        }
    })

}