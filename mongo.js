import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
        const email = req.body.email;
        const password = req.body.password;

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({email:email, password:hashedPassword})
        const savedUser = await user.save();
        res.status(201).json({message:"user created successfully"})
    }catch(err){
        console.log(err)
        // Send an error response so the client doesn't hang
        res.status(500).json({error: "Failed to create user"})
    }
})

// login route
app.post("/login",async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email:email})
        if(!user) return res.status(404).json({message:"user not found"})
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(404).json({message:"invalid crediential"})
        

        // jwt token assign
        const token = jwt.sign({id:user._id,email:user.email},
            process.env.jwt_secret,
            {expiresIn:"1h"}
        );
        // console.log(token)
        res.json({message:"login successfully", token});
    }catch(err){
        res.status(400).json({message:"invalid credential"});
    }

})

// middleware

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer"))
        return res
            .status(401)
            .json({message:"access denied, no token available"})

    const token = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token,process.env.jwt_secret);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({message:"invalid token"})
    }
}

app.get("/users",verifyToken,async (req,res)=>{
    try{
        const users =  await User.find();
        if(!users)
            return res.status(404).json({message:"something went wrong  "})
        res.json(users);
    }catch(err){
        res.status(400).json({message:"error",err})
    }
})

//  read
app.get("/allusers", async(req,res)=>{
    try{
       const users = await User.find();
       res.status(200).json(users)
    }catch(err){
        console.log(err)
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
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
})

// update route
app.put("/allusers/:id", async(req,res)=>{
    try{
        // If the user is updating their password, hash it first
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,});
        if(!updatedUser)
            return res.status(404).json({message:"something went wrong"})
        res.json(updatedUser)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to update user"})
    }
})

app.delete("/allusers/:id", async(req,res)=>{
    try{
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if(!deletedUser) return res.status(404).json({message:"user is not there"})
    res.json(deletedUser);
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
})

app.listen(PORT , ()=>{
    console.log(`server is runnning on port:${PORT}`)
})