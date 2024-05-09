const express=require("express");

const router=express.Router();

router.get("/",(req,res) => {
    res.send("Update Account Route");
})

module.exports=router;