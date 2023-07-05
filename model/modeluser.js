const mongoose=require('mongoose')
 const dotenv=require('dotenv')
 const jwt=require('jsonwebtoken')
 dotenv.config()

   
const Schemauser=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  image:{
  type:Object
  
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  phone:{
   type:Number ,
   required:true
  },
  addresse:{
    type:String ,
    required:true
  },
  Country:{
    type:String ,
    required:true
  },
  isAdmin:{
    type:Boolean,
    default:false
  }

  
},{timestamps:true})
  //  fonctionalité for schema method
Schemauser.methods.getTokens= function () {
  try {
    const token=jwt.sign({id:this._id,isAdmin:this.isAdmin,name:this.name},process.env.PrivateToken,{expiresIn:'1d'})
    console.log(token,"token")
   
    return token 
  } catch (error) {
   console.log(error)
     res.send(error)
  }
   


}



const ModelUser=mongoose.model('user',Schemauser)
module.exports={ModelUser,Schemauser}