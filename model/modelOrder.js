

const mongoose=require('mongoose')

const shemaOrder=new mongoose.Schema({
    id:{type:String},
 user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  hotel:{
   name:String ,
   desc:String ,
   distance:Number,
   city:String,
   photo:String
  },
  rooms:[{
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
    maxPeople:Number,
    total:{
      type:Number,
      required:true
  },
    roomsNumber:[{
       
        
         number:Number,
         avaibleDate:{
            type:[Date]
        },
     
        
    
     
        
       
        
     }]
  }]

},{timestamps:true})

  const modelOrder=mongoose.model('order',shemaOrder)

  module.exports=modelOrder