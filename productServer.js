import express from "express"
import fs from "fs"

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("helloooo from server")
});

app.get("/product",(req,res)=>{
    fs.readFile("product_api.json","utf-8",(err,data)=>{
        if(err){
            res.status(500).send("error reading file")
        }else{
            const products = JSON.parse(data)
            res.json(products)
        }
    })
});

app.listen(PORT,()=>{
    console.log(`server is listening on Port ${PORT}`)
})