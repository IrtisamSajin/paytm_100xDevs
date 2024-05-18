const express=require("express");

const router=express.Router();
const userRoute=require("./user");
const accountRoute=require("./account")

router.use("/user",userRoute);
router.use("/account",accountRoute);
router.get("/",(req,res)=>{
    res.send("Reached Root Route");
})

module.exports=router;