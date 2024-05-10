const express=require("express");

const router=express.Router();

router.get("/",(req,res) => {
    res.send("User Route");
})

const signupRoute=require("./signupRoute");
const signinRoute=require("./signinRoute");

router.use("/signup",signupRoute);
router.use("/signin",signinRoute);

module.exports=router;