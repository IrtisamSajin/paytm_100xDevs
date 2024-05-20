const express=require('express');
const {Account}=require("../db")
const mongoose=require('mongoose');

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

router.post("/transfer", authMiddleware, async (req, res) => {
    const session= await mongoose.startSession();
    session.startTransaction();
    try{
        const sender=await Account.findOne({userId:req.userId}).session(session);;
        const receiver=await Account.findOne({userId:req.body.to}).session(session);;
        if(!sender || !receiver){
            await session.abortTransaction();
            return res.status(400).json({
                message:"Invalid User"
            })
        }
        if(sender.balance<req.body.amount){
            await session.abortTransaction();
            return res.status(400).json({
                message:"Insufficient Balance"
            })
        }
        const amount=req.body.amount;
        await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
        await Account.updateOne({userId:req.body.to},{$inc:{balance:amount}}).session(session);
        session.commitTransaction();
        return res.status(200).json({
            message: "Transfer Successful"
        })

    }catch(err){
        await session.abortTransaction();
        res.status(400).send({
            message: err.message
        })
    }
});

module.exports=router;