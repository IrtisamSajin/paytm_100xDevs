
const jwt=require('jsonwebtoken');

function authMiddleware (req,res,next){
    try{
        const token=req.headers['authorization'].split(" ")[1];
        const verifiedUser=jwt.verify(token,process.env.JWT_KEY);
        req.userId=verifiedUser.userId;
        next();
    }catch(err){
        res.status(403).json({message: "Authentication Failed"});
    }
}

module.exports=authMiddleware;