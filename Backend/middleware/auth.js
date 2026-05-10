//JWT Middleware
import jwt from  'jsonwebtoken';
//Since middleware sits between req and controller:
// flow : Middlware/ controller /Response
//next: means continue to next middleware/controller without "next" Request gets stuck
export const auth = (req,res, next)=>{

    const authHeader= req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({message:"Unauthorized access"});
    const token = authHeader.split(" ")[1];
    const secret =process.env.JWT_SECRET;
    try{
        const decodedPayload = jwt.verify(token, secret);
        req.user=decodedPayload;
        next();
    }catch(err){
        res.status(401).json({message:"Invalid or expired token"});
    }
};