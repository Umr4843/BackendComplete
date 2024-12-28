const express=require("express")
const router=express.Router();
const userRoute=require("./user.route")
const productRoute=require("./product.route")
const categoryRoute=require("./category.route")


router.use("/users",userRoute)
router.use("/products",productRoute)
router.use("/categories",categoryRoute)



module.exports=router;


