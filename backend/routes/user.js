const express=require("express");
const {User}=require("../db");
const zod=require("zod");

const router=express.Router();
const authMiddleware=require("./middleware")

router.get("/",authMiddleware,(req,res) => {
    res.send("User Route");
})

const updateBody = zod.object({
	password: zod.string().min(6).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/",authMiddleware,async (req,res) => {
    try{
        updateBody.parse(req.body);
        await User.updateOne(
            {_id:req.userId},
            req.body
        )
        res.status(200).json({
            message: "Updated successfully"
        });
    }catch(err){
        res.status(411).json({
            message: "Error while updating information"
        });
    }
})

router.get("/bulk",async (req,res) => {
    const filter=req.query.filter || "";
    try{
        const users=await User.find({$or:[{
            firstName:{
                $regex:new RegExp(filter,'i')
            }
        },
        {
            lastName:{
                $regex:new RegExp(filter,'i')
            }
        }]},'firstName lastName _id username');
        res.status(200).json(users);
    }
    catch(err){
        res.send(500).json({
            message: "Server Issues"
        })
    }
})

const signupRoute=require("./signupRoute");
const signinRoute=require("./signinRoute");

router.use("/signup",signupRoute);
router.use("/signin",signinRoute);

module.exports=router;