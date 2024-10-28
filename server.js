require("dotenv/config");
const mongoose = require("mongoose");
const app = require("./app.js");
const port = process.env.PORT ||3000

mongoose.connect(process.env.MONGODB_URL_LOCAL)

.then(()=>{console.log("mongodb connected successfullly")})
.catch(()=>{err.message})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)  

})





