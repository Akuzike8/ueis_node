class authController
{
   static generateToken = async (req,res) => {
        try {
            // JWT token generation function

            const jwt = require('jsonwebtoken');
            const fs = require('fs')
            const path = require('path');

            const privateKey = fs.readFileSync(path.join(__dirname+'../../keys/private.key')).toString();

            const payload = {
                nid:'mw1234',
                email:'ex@mail.com',
                user:'john doe',
                role: 'user'
            }

            jwt.sign({data:payload}, privateKey, { algorithm: 'RS256', expiresIn: '1w' },(err,token) => {

                if (err) res.status(400).json({message:err.message})

                res.cookie("token",token,{httpOnly: true,sameSite: 'Lax',secure: true})
                res.cookie("user",payload.user,{sameSite: 'Lax',secure: true})
                res.status(201).json({token})
            });

        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }

    static verifyToken = async (req,res) => {
        try {
            // JWT Token verification function

            const jwt = require('jsonwebtoken');
            const fs = require('fs')
            const path = require('path');

            const publickey = fs.readFileSync(path.join(__dirname+'../../keys/public.key')).toString();
            const token = req.cookies.token

            jwt.verify(token,publickey,{algorithm: 'RS256'},(err,decoded) =>{

                if (err) res.status(400).json({message:err.message})

                res.status(200).json(decoded)
            });

        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }

    static refreshToken = async (req,res) => {
        try {
            // JWT Token refreshing function
            const jwt = require('jsonwebtoken');
            const fs = require('fs')
            const path = require('path');

            const privateKey = fs.readFileSync(path.join(__dirname+'../../keys/private.key')).toString();
            const publickey = fs.readFileSync(path.join(__dirname+'../../keys/public.key')).toString();
            const token = req.cookies.token

            jwt.verify(token,publickey,{algorithm: 'RS256'},(err,decoded) =>{

                if (err) res.status(400).json({message:err.message})

                res.clearCookie(req.cookies.token);

                jwt.sign({data:decoded.data}, privateKey, { algorithm: 'RS256', expiresIn: '1w' },(err,token) => {

                    if (err) res.status(400).json({message:err.message})

                    res.cookie("token",token,{httpOnly: true,sameSite: 'Lax',secure: true})
                    res.status(201).json({token})
                });
            });
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }
}

module.exports = authController;
