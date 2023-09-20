const authorize = async (req,res,next) => {
    try {
        // JWT Token verification function

        const jwt = require('jsonwebtoken');
        const fs = require('fs')
        const path = require('path');

        const publickey = fs.readFileSync(path.join(__dirname+'../../keys/public.key')).toString();
        const token = req.cookies.token

        jwt.verify(token,publickey,{algorithm: 'RS256'},(err,decoded) =>{

            if (err) res.status(400).json({message:err.message})

            next()
        });

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports = authorize
