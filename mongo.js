import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const PORT = 3000;
const app = express();
dotenv.config();

app.use(express.json())

mongoose.connect(process.env.mongodb_url)
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log(err)
})

// creating schema
const userSchema = new mongoose.Schema({
    email:String,
    password:String,
});
// creating model
const User = mongoose.model("User",userSchema);

// create route
app.post("/signup", async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user = new User(req.body)
        const savedUser = await user.save();
        res.status(201).json({message:"user created successfully    "})
    }catch(err){
        console.log(err)
        // Send an error response so the client doesn't hang
        res.status(500).json({error: "Failed to create user"})
    }
})

//  read
app.get("/allusers", async(req,res)=>{
    try{
       const users = await User.find();
       res.status(200).json(users)
    }catch(err){
        res.status(400).json({message:"something went wrong"})
    }
})
//  read by Id
app.get("/allusers/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message:"user not found"})
        res.json(user);
    }catch(err){
        res.status(404).json({message:"somrthing went wrong"})
    }
})

// update route
app.put("/allusers/:id", async(req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,});
        if(!updatedUser)
            return res.status(404).json({message:"something went wrong"})
        res.json(updatedUser)
    }catch(err){
        res.status(404).json({message:"err"})
    }
})

app.delete("/allusers/:id", async(req,res)=>{
    try{
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if(!deletedUser) return res.status(404).json({message:"user is not there"})
    res.json(deletedUser);
    }
    catch(err){
        res.status(400).json({message:"something went wrong"})
    }
})

app.listen(PORT , ()=>{
    console.log(`server is runnning on port:${PORT}`)
})