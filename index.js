require('dotenv').config()
const express = require('express')
const cors = require('cors')
const route = require('./Routes/route')
const jwtMiddleWare = require('./middleware/jwtMiddleware')

require('./connection/db')
const eKart = express()
eKart.use(cors())
eKart.use(express.json())


eKart.use(route)

const PORT = 3000 || process.env.PORT

eKart.listen(PORT,()=>{

    console.log(`Ekart server started at : ${PORT}`)
})

eKart.get('/',(req,res)=>{
    res.send("<h1>Daily cart started ..waiting for client request </h1>")
})