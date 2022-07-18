const express= require('express')

const jwt=require('jsonwebtoken')
const cors=require('cors')
const dataservice=require('./service/dataservice')
const app= express()

//cors use in app
app.use(cors({
    origin:"http://localhost:4200"
}))

//parse json data
app.use(express.json())

//token verify
const jwtMiddleware = (req,res,next)=>{
    //to fetch token
    try{
        token = req.headers['reminder-token']
        const data = jwt.verify(token,'secretkey123')
        req.currentUserid = data.currentUserid
        next()
    }
    catch{
        res.status(401).json({
            status:false,
            statusCode:401,
            message:'Please login001'
        })
    }
}

//Register api
app.post('/register',(req,res)=>{
    dataservice.register(req.body.username,req.body.userid,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//login api
app.post('/login',(req,res)=>{
    dataservice.login(req.body.userid,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//addEvent api
app.post('/addEvent',jwtMiddleware,(req,res)=>{
    dataservice.addEvent(req,req.body.date,req.body.event)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//getEvent api
app.post('/getEvent',jwtMiddleware,(req,res)=>{
    dataservice.getEvent(req,req.currentUserid)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
// removeEvent api
app.post('/removeEvent',jwtMiddleware,(req,res)=>{
    dataservice.removeEvent(req,req.k)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})


//set port number
app.listen(3000,()=>{
    console.log("Server started at port 3000");
})

