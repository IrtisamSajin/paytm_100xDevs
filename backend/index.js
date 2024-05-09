const express = require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const app=express();
dotenv.config();

app.use(express.json());
app.use(cors());

const rootRoute=require("./routes/index");

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log(err);
})

app.get("/",(req,res) => {
    res.send("Hello world")
}) 
app.use("/api/v1",rootRoute);


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})