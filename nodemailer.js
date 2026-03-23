import express from "express";

import nodemailer from "nodemailer"

const PORT = 3000;
const app = express();

app.get("/",(req,res)=>{
    res.send("hiii from the server for nodemailer")
})

// createTransport
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"ssyugedu@gmail.com",
        pass:"fndr qniy waov beoo"
    }
})

const mailOption = {
    from:"ssyugedu@gmail.com",
    to:"sandeepsharma9182@gmail.com",
    subject:"Test mail for nodemailer topic",
    text:"This is test mail for revision purpose"
}

transporter.sendMail(mailOption,(err,info)=>{
    if(err){
        console.log(err)
    }else{
        console.log("email sent"+ info.response)
    }
})

app.listen(PORT,()=>{
    console.log(`server for node mailer is listening on port ${PORT}`)
})
