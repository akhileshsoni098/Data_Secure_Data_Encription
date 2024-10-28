require("dotenv/config");

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());

// routes will be here

app.get("/" ,async(req, res)=>{
    res.status(200).json({status:true , message:"app is working good"})
})

const userDataRoutes = require("./routes/userDataRoutes")

app.use("/user", userDataRoutes)
 
module.exports = app





