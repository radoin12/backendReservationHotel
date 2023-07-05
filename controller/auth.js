const{ModelUser} =require('../model/modeluser.js')
const bcrypt=require('bcrypt')
const createErrorMsg = require('./utils/error.js')


const Regester=async(req,res,next)=>{
    try {
       
        const salt=await bcrypt.genSalt(10)
        const pass=await  bcrypt.hash(req.body.password,salt)
        const newUser=new ModelUser({name:req.body.name,image:req.body.image,phone:req.body.phone,addresse:req.body.addresse,email:req.body.email,password:pass,Country:req.body.Country})
         await newUser.save()
             const otherdetail=newUser
             otherdetail.password=undefined
             otherdetail.isAdmin=undefined

            
         
         res.status(200).send(otherdetail)
    } catch (error) {
        next(error)
    }
   
}
           // login user

    const LoginUser=async(req,res,next)=>{
        try {
            const findUser=await ModelUser.findOne({email:req.body.email})
            if (!findUser) {
               return next(createErrorMsg( 404,'verify your email address or password') )
            }
            const correctPassword=await bcrypt.compare(req.body.password,findUser.password)
            if (!correctPassword) {
               return next(createErrorMsg(401,'verify your email address or password'))
            }
             const accessToken=await findUser.getTokens()
            // const{password,isAdmin,...otherDetails}=findUser._doc
            res.cookie('accessToken',accessToken,{httpOnly:true}).status(200).json(accessToken)
        } catch (error) {
            res.send(error)
        }
         
    }
    const Logout=(req,res,next)=>{
       try {
        res.clearCookie('accessToken').status(200).send('you are logout ')
       } catch (error) {
        next(error)
       }
    }

module.exports={Regester,LoginUser,Logout}