import express from "express";
import mongoose from "mongoose"

const PORT = 3000;
const app = express();

app.get("/",(req,res)=>{
    res.send("hello world !!")
})
// mongoose connection
// Added a database name "myDatabase" to the end of the connection string
mongoose.connect("mongodb+srv://sandeepsharma9182:sandeep123@revision.wpzwcop.mongodb.net/")
.then((data)=>{
    console.log("mongodb connected")
})
.catch((err)=>{
    console.log(err)
})

app.listen(PORT, ()=>{
    console.log(`server for mogodb setup is running on port ${PORT}`)
})