const express=require('express')
const modelHotel=require('../model/modelHotel.js')
const { createHotel, upDtaeHotel, deleteHotel, findOneHotel,findbyCityAndprice, findAllHotel, findByCity, findBytype, findByFeatures } = require('../controller/hotel.js')
const { verfiyAdmin, verifyToken } = require('../controller/utils/verifytoken.js')
const route=express.Router()

route.post('/api/hotel/create',verifyToken,verfiyAdmin,createHotel)

route.put('/api/hotel/update/:id',verifyToken,verfiyAdmin,upDtaeHotel)
route.delete('/api/hotel/delete/:id',verifyToken,verfiyAdmin,deleteHotel)
 route.get('/api/hotel/:id',findOneHotel)
 route.get('/api/city',findByCity)
 route.get('/api/findbytype',findBytype)
 route.get('/api/hotel',findAllHotel)

 route.get('/api/featureHotel',findByFeatures)
route.get('/api/finddetails',findbyCityAndprice)


module.exports=route
