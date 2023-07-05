const modelHotel = require("../model/modelHotel")
const modelRooms = require("../model/modelrooms")


 const createHotel=async(req,res,next)=>{
    try {
     
       
        const h=await modelHotel.create(req.body) 
     
       res.status(200).send(h)
    
        
    } catch (error) {
        next(error)
    }
    }
 const upDtaeHotel=async(req,res,next)=>{
    const id=req.params.id
    console.log(typeof(id),id,'test id hotel')
    try {
     const HotelChanged=await modelHotel.findByIdAndUpdate(id,{$set:req.body},{new:true})
     console.log(HotelChanged,'change')
     res.send(HotelChanged)
    } catch (error) {
        next(error)
    }
    
 }

const deleteHotel=async(req,res)=>{
    const id=req.params.id
    console.log(id)
    try {
     const HotelDeleted=await modelHotel.findByIdAndDelete(id)
   
     res.send(HotelDeleted)
    } catch (error) {
        res.status(500).send(error)
    }
    
 }
  const findOneHotel=async(req,res)=>{
    const id=req.params.id
    console.log(id)
    try {
     const Hotel=await modelHotel.findById(id).populate('rooms')
    
   
     res.send(Hotel)
    } catch (error) {
        res.status(500).send(error)
    }
    
 }
 const findByCity=async(req,res)=>{
    const cityProp=req.query.cityName.split(',')
  
    try {
      
     const list =await Promise.all(cityProp.map((item)=>{
        return  modelHotel.countDocuments({city:(item)})
     }))
       
     res.send(list)
    } catch (error) {
        res.status(500).send(error)
    }
    
 }
 const findbyCityAndprice=async(req,res,next)=>{
  
     try {
        const cities=req.query.city.split(',')
        console.log(cities)
        
        const y=await  modelHotel.find({city:{$regex:cities[0]},cheapsPrice:{$gt:parseInt(cities[1]),$lt:parseInt(cities[2])}})
           
           
    
          
     
         
        
        res.send(y)  
     } catch (error) {
        next(error)
     }
 }



 const findBytype=async(req,res,next)=>{
    try {
        const typeHotel=await modelHotel.countDocuments({types:'hotel'})
        const typeCabin= await modelHotel.countDocuments({types:'cabin'}) 
        const typeVille=await modelHotel.countDocuments({types:'ville'})
        const typeAppartement=await modelHotel.countDocuments({types:'appartement'})
        const typeRessort=await modelHotel.countDocuments({types:'ressort'})
        res.json([{types:'hotel',count:typeHotel},
          {types:'cabin',count:typeCabin},
          {types:'appartement',count:typeAppartement},
          {types:'ville',count:typeVille},
          {types:'ressort',count:typeRessort}
    ])
    } catch (error) {
        next(error)
    }
    

 }

 const findByFeatures=async(req,res,next)=>{

  try {
    const {min,max,limit,...others}=req.query
    console.log(others,"others")
    
  
    const feature=await modelHotel.find({...others,cheapsPrice:{$gt:min|1,$lt:max|1000}}).limit(req.query.limit) 
    res.send(feature)
  } catch (error) {
     next(error)
  }
 }
const findAllHotel=async(req,res,next)=>{
    const failed=true 
    
    try {
        
            const Hotel=await modelHotel.find({}).populate('rooms')
   
            res.send(Hotel)
        
     
    } catch (error) {
        next(error)
    }
    
 }





    module.exports={createHotel,upDtaeHotel,deleteHotel,findOneHotel,findBytype,findAllHotel,findByCity,findByFeatures
    ,findbyCityAndprice
    }