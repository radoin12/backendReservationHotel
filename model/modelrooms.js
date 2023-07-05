const mongoose=require('mongoose')


const roomSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true 
    },
    price:{
        type:Number,
        required:true
    },
  
  
    
    roomsNumber:[{
       number:
        {
       
        num:Number ,
        avaibleDate:{
            type:[Date]
        }
    }
    ,
       
      
       
    }],
    maxPeople:{
        type:Number,
       required:true
    }
   
    
},{timestamps:true})
const modelRooms=mongoose.model('rooms',roomSchema)

module.exports=modelRooms