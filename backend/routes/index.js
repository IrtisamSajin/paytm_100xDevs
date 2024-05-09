const express=require("express");

const router=express.Router();
const userRoute=require("./user");

router.use("/user",userRoute);
router.get("/",(req,res)=>{
    res.send("Reached Root Route");
})

module.exports=router;