const express=require("express");
const {User}=require("../db");
const zod=require("zod");
const jwt=require("jsonwebtoken");

const router=express.Router();

router.get("/",(req,res) => {
    res.send("Signin Route");
})

const signinSchema=zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})

router.post("/", async (req,res) => {
    try{
        signinSchema.parse(req.body);
        const user= await User.findOne(req.body);
        if(!user){
            throw new Error;
        }
        const token=jwt.sign({userId: user._id},process.env.JWT_KEY);
        res.status(200).json({token});
    }
    catch(err){
        res.status(411).json({
            message: "Error while logging in"
        });
    }
})

module.exports=router;