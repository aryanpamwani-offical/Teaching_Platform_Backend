
const jwt=  require('jsonwebtoken');
const User = require("../model/user.model");



 const verifyJwt = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(400).json({error:"Token not found"});
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) ;
            // console.log(decoded);
            const phone_number=decoded?.phone_number;
            const user = await User.findOne({phone_number}).select("-password");
            // console.log(user);
            
            if (!user) {
                return res.status(401).json({error:"User not found"});
            }
            
            req.user = user;
            next();
        } catch (jwtError) {
            console.log(jwtError)
            return res.status(400).json({error:"Invalid found"});
        }
    } catch (error) {
        console.log(error)
      
    }
};
 const isStudent=async(req, res, next)=>{
    try {
        if (req.user?.userType!=="Student" ) {
 return res.status(401).json({error:"No access to this route"});
                       
        }
        next();
    } catch (error) {
        return res.status(400).json({error:"Internal Server Error",error});
    }
}

 const isAdmin=async(req, res, next)=>{
    try {
        if (req.user?.userType!=="Admin") {
 return res.status(401).json({error:"No access to this route"});         
        }
        next();
    } catch (error) {
        return res.status(400).json({error:"Internal Server Error",error});
    }
}
module.exports={verifyJwt,isStudent,isAdmin}