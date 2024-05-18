const express=require('express');
const {Account}=require("../db")

const router=express.Router();

const authMiddleware=require("./middleware");

router.get("/",(req,res) => {
    res.send("account reached");
})

router.get("/balance",authMiddleware,async (req,res) => {
    try{
        const {balance}=await Account.findOne({userId:req.userId});
        res.status(200).json({balance});
    }
    catch(err){
        res.status(400).json({
            message: "Invalid account"
        });
    }
})

module.exports=router;