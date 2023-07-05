const modelHotel = require("../model/modelHotel")
const modelRooms = require("../model/modelrooms")
  const mongoose=require('mongoose')
  var ObjectId = require('mongodb').ObjectId;

const createRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelId
    console.log(hotelId)

 try {
    const roomItem=await modelRooms.create(req.body)
     const hotelRooms=await modelHotel.findByIdAndUpdate(hotelId,{$push:{rooms:roomItem}})
    res.send(roomItem)
 } catch (error) {
    next(error)
 }
}
const updateRooms=async(req,res,next)=>{
    const id=req.params.id
    // const idHotel=req.params.idhotel

    try {
        
        console.log(id)
        const updateRooms=await modelRooms.findById(id)
       
     
      const y=  await modelRooms.findByIdAndUpdate(id,{$set:req.body},{new:true})
 
 
       res.send(y) 
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const upDateAvailbleRoom=async(req,res,next)=>{
   
    const q=req.query.q
    console.log(q)
  let querries=q.split("")
      let b=''
      for(x in querries){
       
        if (querries[x]!=="[" && querries[x]!=="]") {
        b+=querries[x]
        }
      }
   console.log(b)
   const y=b.split(',')
   console.log(y)
      try {
     const {avaibleDate,selected}=req.body
      
     const filterId=await modelRooms.find({})
   
            
      const findRoomNumber=await  modelRooms.updateMany({
        roomsNumber:{$elemMatch: {"_id":{$in:y}}}
      },{
            $push:
            {'roomsNumber.$[outer].number.avaibleDate':avaibleDate
          
          }
            
        
    
    },
    { arrayFilters: [ {"outer._id":{$in:y}}] }
    
    )
   
      

     res.send(findRoomNumber)      
  } catch (error) {
    next(error)
  }
}
const findRoomsId=async(req,res,next)=>{
   
  const q=req.query.q
  console.log(q)
let querries=q.split("")
    let b=''
    for(x in querries){
     
      if (querries[x]!=="[" && querries[x]!=="]") {
      b+=querries[x]
      }
    }
 console.log(b)
 const y=b.split(',')
 console.log(y)
    try {

    
  
 
          
    const findRoomNumber=await  modelRooms.find({
      _id:{$in:y}
    })
 
    

   res.send(findRoomNumber)      
} catch (error) {
  next(error)
}
}


















const deleteRoom=async(req,res,next)=>{

    try {
        const idRoom=req.params.id
        // const idhotel=req.params.idhotels
      const deleteRooms=await modelRooms.findByIdAndDelete(idRoom) 
    //    await modelHotel.findByIdAndUpdate(idhotel,{$pull:{room:idRoom}})
     res.send(deleteRooms) 
    } catch (error) {
        next(error)
    }
}
const findRoom=async(req,res,next)=>{
    const idRoom=req.params.id
   
    try {
      const findRoom=await modelRooms.findById(idRoom) 
      res.send(findRoom) 
    } catch (error) {
        next(error)
    }
}

const findRooms=async(req,res,next)=>{
  
    try {
      const findRooms=await modelRooms.find() 
    res.send(findRooms) 
    } catch (error) {
        next(error)
    }
}


module.exports={createRoom,findRoomsId,updateRooms,findRoom,findRooms,deleteRoom, upDateAvailbleRoom}
