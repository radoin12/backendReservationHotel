
const modelOrder = require("../model/modelOrder")
const moment=require('moment')
const { ModelUser } = require("../model/modeluser")


const createOrder=async(req,res,next)=>{
   try {
    const newOrder=await modelOrder.create(req.body)
    res.send(newOrder)
   } catch (error) {
    next(error)
   }
   


}
const findAllOrders =async(req,res,next)=>{
    try {
     const Order=await modelOrder.find({}).populate({path:'user',select:['-isAdmin','-password']})  
       res.send(Order)
    } catch (error) {
     next(error)
    }
    
 
 
 }
 const deleteOrders =async(req,res,next)=>{
    const id =req.params.id
    try {
     const deleteOrder=await modelOrder.findByIdAndDelete(id)  
       res.send(deleteOrder)
    } catch (error) {
     next(error)
    }
    
 
 
 }
//   order with the previes month user
const compareOrderForMonth=async(req,res,next)=>{
    const previousMonth=moment()
        .month(moment().month()-1)
        .set('date',1)
        .format('YYYY-MM-DD HH:mm:ss');
        console.log(previousMonth,"previes month") 
    try {
         const user=await ModelUser.aggregate([
            {
                $match:{createdAt:{$gte:new Date(previousMonth)}}
            },
            {
                $project:{mois:{$month:'$createdAt'}}
            },
            {
                $group:{_id:'$mois',total:{$sum:1}}
            },
            {$sort:{_id:-1}}
         ])
        res.send(user)  
    } catch (error) {
        next(error)
    }
   
}
// order with order reservation
const orderReservation=async(req,res,next)=>{
  const previeusMonthReservation=moment()
  .month(moment().month()-1)
  .set('date',1)
  .format('YYYY-MM-DD HH:mm:ss');
  try {
    const resrvation=await modelOrder.aggregate([
        {
            $match:{createdAt:{$gte:new Date(previeusMonthReservation)}}
        },
        {
            $project:{
               mois:{$month:'$createdAt'}  
            }
        },
        {
            $group:{
              _id:"$mois",total:{$sum:1}
            }
        },
        
            {$sort:{_id:-1}}

    ])
    res.send(resrvation)
  } catch (error) {
    next(error)
  }
}
// find order of each user
const findOrderById=async(req,res,next)=>{
  const id=req.params.id
  try {
    const orderUser=await modelOrder.find({id:id}) 
    res.send(orderUser)
  } catch (error) {
    next (error)
    
  }

}



// earning Money
const earningMony=async(req,res,next)=>{
    const previeusMonthReservation=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    try {
      const resrvation=await modelOrder.aggregate([
          {
              $match:{createdAt:{$gte:new Date(previeusMonthReservation)}}
          },
          {
            $project:{mois:{$month:'$createdAt'},sales:"rooms.$.total"}
        },
        {
            $group:{_id:'$mois',total:{$sum:'$sales'}}
        },
        {$sort:{_id:-1}}
          
            
  
      ])
      res.send(resrvation)
    } catch (error) {
      next(error)
    }
  }

    // statorders7wee
   const orderLastSevenWeek=async(req,res,next)=>{
       const lastsevenWeek=moment()
       .day(moment().day()-7)
      
       .format('YYYY-MM-DD HH:mm:ss');
       try {
     
        const user=await modelOrder.aggregate([
          {
            $unwind:'$rooms'
          },
           {
               $match:{createdAt:{$gte:new Date(lastsevenWeek)}}
   
              
           },
           {
               $project:{day:{$dayOfWeek:'$createdAt'},sales:'$rooms.total'}
           },
           {
               $group:{_id:'$day',total:{$sum:'$sales'}}
           },
           {$sort:{_id:1}}
        ])

        res.json(user)
           
        
        
       } catch (error) {
         next(error)
       }

    }

  // order for 6 month previos money
 const orderForLastSixMonthMoney=async(req,res,next)=>{
  const previeusSixMonth=moment().month(moment().month()-6)
  .set('date',1)

  .format('YYYY-MM-DD HH:mm:ss');
 
   try {
  const order=await modelOrder.aggregate([
 {
  $unwind: "$rooms",

 }
   
 
     ,
    {
   $match:{createdAt:{$gte:new Date(previeusSixMonth)}}
    },

    {
      $project:{month:{$month:'$createdAt'}, sales: "$rooms.total" }
    },
    {
      $group:{_id:'$month',
      total_money: { $sum: "$sales"}}
    },
    {
      $sort:{_id:1}
    }

  ])
  console.log(order)
  res.send(order)

   } catch (error) {
    console.log(error)
    next(error)

   }

 }
 const orderForLastSixMonth=async(req,res,next)=>{
  const previeusSixMonth=moment().month(moment().month()-6)
  .set('date',1)

  .format('YYYY-MM-DD HH:mm:ss');
 
   try {
  const order=await modelOrder.aggregate([

   
 
     
    {
   $match:{createdAt:{$gte:new Date(previeusSixMonth)}}
    },

    {
      $project:{month:{$month:'$createdAt'}}
    },
    {
      $group:{_id:'$month',
      total: { $sum: 1}}
    },
    {
      $sort:{_id:-1}
    }

  ])
  console.log(order)
  res.send(order)

   } catch (error) {
    console.log(error)
    next(error)

   }

 }










module.exports={createOrder,findAllOrders,
    deleteOrders,
    compareOrderForMonth,orderReservation
 ,findOrderById,earningMony,orderForLastSixMonth,orderForLastSixMonthMoney,
 orderLastSevenWeek
}