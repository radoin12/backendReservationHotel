const express=require('express')
const { Regester, LoginUser ,Logout} = require('../controller/auth')
const route=express.Router()

 route.post('/api/register',Regester)
 route.post('/api/login',LoginUser)
 route.post('/api/logout',Logout)
module.exports =route
