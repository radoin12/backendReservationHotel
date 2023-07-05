const express=require('express')
const{createRoom,updateRooms,findRoom,findRooms,deleteRoom, upDateAvailbleRoom, findRoomsId}=require('../controller/room.js')
const { verifyToken, verfiyAdmin } = require('../controller/utils/verifytoken.js')
const route=express.Router()

route.post('/api/rooms/create/:hotelId',verifyToken,verfiyAdmin,createRoom)
route.put('/api/rooms/update/:id',verifyToken,verfiyAdmin,updateRooms)
route.get('/api/rooms',verifyToken,verfiyAdmin,findRooms)
route.delete('/api/rooms/delete/:id',verifyToken,verfiyAdmin,deleteRoom)
route.get('/api/rooms/:id',verifyToken,verfiyAdmin,findRoom)
route.put('/api/availbleRoom', upDateAvailbleRoom)
route.get('/api/roomsId',findRoomsId )
module.exports=route