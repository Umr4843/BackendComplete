const express=require("express")
const app=express();
require("dotenv").config();
const connectDb=require("./config/connectDb")
connectDb();
const indexRoute=require("./routes/index")

app.use(express.json());
app.use("/api/admin",indexRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})


