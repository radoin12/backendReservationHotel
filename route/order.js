

const express=require('express')
const { createOrder, findAllOrders, deleteOrders, compareOrderForMonth, orderReservation, findOrderById, earningMony, orderForLastSixMonth, orderForLastSixMonthMoney, orderLastSevenWeek } = require('../controller/order')

const route=express.Router()

route.post('/api/create/orders',createOrder)
route.get('/api/orders',findAllOrders)
route.delete('/api/orders/delete/:id',deleteOrders)
route.get('/api/orders/month',compareOrderForMonth)
route.get('/api/orders/reservation',orderReservation)
route.get('/api/orders/user/:id',findOrderById)
route.get('/api/earnMoney',earningMony)
route.get('/api/orders/sixMonth',orderForLastSixMonth)
route.get('/api/orders/sixMonthMoney',orderForLastSixMonthMoney)
route.get( '/api/orders/lastWeek' ,orderLastSevenWeek)
module.exports=route