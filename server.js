const express= require('express')
const mongoose = require('mongoose')
const path = require('path')
const port =3019

const app = express()

app.use(express.static(__dirname))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'contact.html'))
})


app.listen(port,()=>{
    console.log("Server has Started");
    
})