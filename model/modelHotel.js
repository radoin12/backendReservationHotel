const mongoose=require('mongoose')


const HotelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true 
    },
    city:{
        type:String,
        required:true
    },
    rooms:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms'
      }],
    distance:{
        type:Number,
        required:true
    },
    photo:{
        type:[String]
    },
    address:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        min:0,
        maw:5
    },
    cheapsPrice:{
         type:Number,
         required:true
    },
    features:{
        type:Boolean,
        default:false
    },
    types:{
       type:String
    }
})
const modelHotel=mongoose.model('hotel',HotelSchema)

module.exports=modelHotel