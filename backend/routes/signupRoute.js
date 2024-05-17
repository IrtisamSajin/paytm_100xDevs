const express=require("express");
const zod=require("zod");
const jwt=require("jsonwebtoken");
const {User}=require("../db")

const router=express.Router();

router.get("/",(req,res) => {
    res.send("Signup Route");
})

const signupSchema=zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName:zod.string(),
    password: zod.string().min(6)
})
router.post("/",async (req,res) => {
    try{
        signupSchema.parse(req.body);
        const newUser=new User(req.body);
        await newUser.save();        
        const token=jwt.sign({userID: newUser._id},process.env.JWT_KEY);
        res.status(200).json({
            message: "User created successfully",
            token
        });
    }catch(err){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    
})

module.exports=router;