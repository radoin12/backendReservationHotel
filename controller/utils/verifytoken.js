const createErrorMsg = require("./error")
const jwt =require('jsonwebtoken')
 const dotenv=require('dotenv')
 dotenv.config()
const verifyToken=(req,res,next)=>{
   const token=req.cookies['accessToken']
 
   if (!token) {
     return  next(createErrorMsg(401,'unhautorised you dont have access..'))
   }
   jwt.verify(token,process.env.PrivateToken,(err,user)=>{
    if (err) {
       return  next(createErrorMsg(401,'unhautorised you dont have access..'))  
    }
    req.user=user
    next()
   })


}
const verifyUser=(req,res,next)=>{
 
  verifyToken(req,res, ()=>{

    if ((req.user.id===req.params.id)||(req.user.isAdmin)) {
       console.log(req.user.id)
        next()
    }
   
   else{
    return next(createErrorMsg(401,'no access'))
   }
     
    

 


  
  })
   
}

const verfiyAdmin=(req,res,next)=>{
   verifyToken(req,res,()=>{
     if (!req.user.isAdmin) {
        return  next(createErrorMsg(401,'unhautorised you are not admin..'))  
     }
     next()
   })
}

module.exports={verifyToken,verifyUser,verfiyAdmin}