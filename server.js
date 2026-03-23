// import https from "http";

// const PORT = 3000;

// const server = https.createServer((req,res)=>{
//     // console.log(req)
//     console.log(res)
//     console.log(req.body)
//     console.log(req.url)
//     console.log(req.method)
//     res.end("hello from server")
// })

// server.listen(PORT,()=>{
//     console.log("server is running on port 3000")
// // })


import express from "express";

const app = express();
const PORT  = 3000;

// setting view engine
app.set("view engine", "ejs")
// base route

app.get("/",(req, res)=>{
    res.end("hello, from server")
});
// Home route
// app.get("/home",(req,res)=>{
//     res.end("This is HOME page")
// });
// // About Page
// app.get("/about",(req,res)=>{
//     res.end("This is About Page")
// });

// MVC(Modal view Controller) architecture 
app.get("/home",(req,res)=>{
    res.render("home",{title:"Home Page"})
})
app.get("/about",(req,res)=>{
    res.render("About",{title:"About Page"})
})
app.get("/contact",(req,res)=>{
    res.render("contact",{title:"contact Page"})
})

app.listen(PORT,()=>{
    console.log(`server is listening on port ${3000}`)
})