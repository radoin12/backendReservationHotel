const { ModelUser } = require("../model/modeluser.js")









const upDateuser=async(req,res,next)=>{
    const id=req.params.id
    console.log(id)
    try {
     const users=await ModelUser.findByIdAndUpdate(id,{$set:req.body},{new:true})
   
     res.send(users)
    } catch (error) {
        next(error)
    }
    
 }
const deleteuser=async(req,res)=>{
    const id=req.params.id
    console.log(id)
    try {
     const userDeleted=await ModelUser.findByIdAndDelete(id)
   
     res.send(userDeleted)
    } catch (error) {
        res.status(500).send(error)
    }
    
 }
  const findOneuser=async(req,res)=>{
    const id=req.user.id

    try {
     const user=await ModelUser.findById(id)
   
     res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
    
 }
 const findOneuserId=async(req,res,next)=>{
    const id=req.params.id
    console.log(id,'please')
 
    try {
     const user=await ModelUser.findById(id)
   
     res.send(user)
    } catch (error) {
       next(error)
    }
    
 }







const findAllUser=async(req,res,next)=>{
    try {
       
       const users=await ModelUser.find()
       res.send(users)
    } catch (error) {
        next(error)
    }
   
}
module.exports={findAllUser,findOneuser,deleteuser,upDateuser,findOneuserId}