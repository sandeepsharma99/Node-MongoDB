import express from "express";

const PORT =3000;
const app = express()

app.use(express.json())

app.use((req,res,next)=>{
    let role = "admin";
    let username = "sandeep";
    let password = "1234";
    if(req.body.username === username && req.body.password === password && req.body.role === role){
        next();
    }else{
        res.send("invalid user");
    }
})
app.get("/",(req,res)=>{
    res.send("hello ji !!!from server")
})

app.post("/login",(req,res)=>{
    // console.log(req.body)
    res.send("login page")
})

app.listen(PORT,()=>{
    console.log(`server is listening on PORT ${PORT}`)
})

