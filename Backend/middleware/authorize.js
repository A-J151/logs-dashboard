import jwt from 'jsonwebtoken';

export const authorize =(allowedRoles)=>{
    return(req,res,next)=>{
        const userRole =req.user?.role; //>. prevents crash is req.user is undefined
        if(!userRole){
            return res.status(401).json({
                message:"User role is missing. Unauthorized access"
            });
        }
        const isAllowed=allowedRoles.includes(userRole);
        if(!isAllowed){
            return res.status(403).json({
                message:"Forbidden: You don't have permission"
            })
        }
        next();
    }
}