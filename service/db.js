const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/reminderapp',{
    UseNewUrlParser:true
})

const User=mongoose.model('User',{
    name:String,
    userid:String,
    Password:Number,
    event:[]
})

module.exports={
    User
}