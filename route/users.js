const express=require('express')
const { findAllUser, deleteuser, findOneuser, upDateuser, findOneuserId } = require('../controller/user')
const { verifyToken, verifyUser, verfiyAdmin } = require('../controller/utils/verifytoken.js')
const route=express.Router()

 route.get('/api/users',findAllUser)
 route.delete('/api/users/delete/:id',verifyToken,deleteuser)
 route.get('/api/users/single',verifyToken,findOneuser)
 route.get('/api/user/:id',verifyToken,verifyUser,findOneuserId)

 route.put('/api/users/update/:id',upDateuser)

module.exports =route